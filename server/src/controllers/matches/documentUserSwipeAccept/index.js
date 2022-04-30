const MatchRecords = require("../../../models/MatchRecords")
const MatchQueue = require("../../../models/MatchQueue")
const { DATA_KEYS } = require("../../../../config/constants")
const handleErrorResponse = require("../../../utils/handleErrorResponse")

const fetchMatchRecord = require("../../controllerHelpers/matches/fetchMatchRecord")
const updateUserMatchRecord = require("../../controllerHelpers/matches/updateUserMatchRecord")
const fetchUserMatchQueue = require("../../controllerHelpers/matches/fetchUserMatchQueue")
const verifyEndpointResponse = require("../../../utils/verifyEndpointResponse")

const handleMutualAccept = require("./handleMutualAccept")
const handleFirstTimeAccept = require("./handleFirstTimeAccept")

const documentUserSwipeAccept = (res, endpointObj, thisUserID, thatUserId) => {
  const invalidRes = typeof res !== "object" || Object.keys(res).length === 0
  if (invalidRes || !endpointObj || !thisUserID || !thatUserId) {
    const err = "documentUserSwipeReject called with invalid arguments"
    const failPromise = new Promise((resolve, reject) => {
      reject(err)
    })
    return failPromise
  }

  const userIdQuery = { [DATA_KEYS["USER_ID"]]: thisUserID }

  return fetchMatchRecord(res, userIdQuery)
    .then((matchRecord) => {
      // Get the match record
      const newRecord = Object.assign(matchRecord)
      // Update the key value pair
      newRecord[thatUserId] = DATA_KEYS["MATCH_ACCEPT"]
      return newRecord
    })
    .then((updatedRecord) => {
      // Update the match record
      const update = {
        $set: {
          [DATA_KEYS["USER_MATCHES"]]: updatedRecord,
        },
      }

      return updateUserMatchRecord(res, userIdQuery, update, {
        upsert: true,
        multi: true,
      })
    })
    .then(() => {
      // Check the match queue of thisUserID
      return fetchUserMatchQueue(res, thisUserID, thatUserId)
    })
    .then((matchQueue) => {
      if (matchQueue.includes(thatUserId)) {
        // Means thatUserId already swiped YES

        // Generate the chat and update user profiles
        return handleMutualAccept(res, thisUserID, thatUserId)
      } else {
        // Means it is a first time swipe for either user
        return handleFirstTimeAccept(res, thisUserID, thatUserId, userIdQuery)
      }
    })
    .then(([chatId, userProfile]) => {
      const responseObj = {
        [DATA_KEYS["CHAT_ID"]]: chatId,
        [DATA_KEYS["USER_PROFILE"]]: userProfile,
      }

      verifyEndpointResponse(responseObj, res, endpointObj, () => {
        res.status(201).json(responseObj)
      })
    })
    .catch((err) => {
      handleErrorResponse(res, `Error recording user YES match => ${err}`, 409)
    })
}

module.exports = documentUserSwipeAccept

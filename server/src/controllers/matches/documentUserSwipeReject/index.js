const MatchRecords = require("../../../models/MatchRecords")
const MatchesQueue = require("../../../models/MatchQueue")
const { DATA_KEYS } = require("../../../../config/constants")
const handleErrorResponse = require("../../../utils/handleErrorResponse")

const removeUserFromMatchQueue = require("../../controllerHelpers/matches/removeUserFromMatchQueue")
const updateUserMatchRecord = require("../../controllerHelpers/matches/updateUserMatchRecord")
const fetchUserDocument = require("../../controllerHelpers/user/fetchUserDocument")
const fetchUserMatchQueue = require("../../controllerHelpers/matches/fetchUserMatchQueue")
const verifyEndpointResponse = require("../../../utils/verifyEndpointResponse")
const fetchMatchRecord = require("../../controllerHelpers/matches/fetchMatchRecord")

const documentUserSwipeReject = (res, endpointObj, thisUserID, thatUserId) => {
  const invalidRes = typeof res !== "object" || Object.keys(res).length === 0
  if (invalidRes || endpointObj === undefined || thisUserID === undefined) {
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
      newRecord[thatUserId] = DATA_KEYS["MATCH_REJECT"]
      return newRecord
    })
    .then((updatedRecord) => {
      // Update the match record
      const update = {
        $set: {
          [DATA_KEYS["USER_MATCHES"]]: updatedRecord,
        },
      }
      const options = { upsert: true, multi: true }
      return updateUserMatchRecord(res, userIdQuery, update, options)
    })
    .then(() => {
      // Check the match queue of thisUserID
      return fetchUserMatchQueue(res, thisUserID, thatUserId)
    })
    .then((matchQueue) => {
      if (matchQueue.includes(thatUserId)) {
        // Means thatUserId already swiped YES
        return removeUserFromMatchQueue(res, thisUserID, thatUserId).then(() => {
          return fetchUserDocument(res, userIdQuery).then((userProfile) => {
            return ["none", userProfile]
          })
        })
      } else {
        // Means it is a first time swipe for either user
        return fetchUserDocument(res, userIdQuery).then((userProfile) => {
          return ["none", userProfile]
        })
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
      handleErrorResponse(res, `Error recording user NO match => ${err}`, 409)
    })
}

module.exports = documentUserSwipeReject

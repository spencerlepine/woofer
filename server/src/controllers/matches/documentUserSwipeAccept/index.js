const MatchRecords = require('../../../models/MatchRecords');
const MatchQueue = require('../../../models/MatchQueue');
const { DATA_KEYS } = require('../../../../config/constants')

const fetchMatchRecord = require('../../../utils/matches/fetchMatchRecord')
const verifyEndpointResponse = require('../../../utils/verifyEndpointResponse')

const handleMutualAccept = require('./handleMutualAccept')
const handleFirstTimeAccept = require('./handleFirstTimeAccept')

const documentUserSwipeAccept = (res, endpointObj, thisUserID, thatUserID) => {
  const userIdQuery = { [DATA_KEYS["USER_ID"]]: thisUserID }

  return fetchMatchRecord(res, userIdQuery)
    .then((matchRecord) => {
      // Get the match record
      const newRecord = Object.assign(matchRecord)
      newRecord[thatUserID] = DATA_KEYS["MATCH_ACCEPTED"]
      return newRecord
    })
    .then((updatedRecord) => {
      // Update the match record
      const update = {
        '$set': {
          [DATA_KEYS["USER_MATCHES"]]: updatedRecord
        }
      }
      const options = { upsert: true, multi: true };
      return updateUserMatchRecord(res, userIdQuery, update, options)
    })
    .then(() => {
      // Check the match queue of thisUserID
      return fetchUserMatchQueue(res, thisUserID, thatUserID)
    })
    .then((matchQueue) => {
      if (matchQueue.includes(thatUserID)) {
        // Means thatUserID already swiped YES

        // Generate the chat and update user profiles
        return handleMutualAccept(res, thisUserID, thatUserID)
      }
      else {
        // Means it is a first time swipe for either user
        return handleFirstTimeAccept(res, thisUserID, thatUserID, userIdQuery)
      }
    })
    .then(([chatId, userProfile]) => {
      const responseObj = {
        [DATA_KEYS["CHAT_ID"]]: "",
        [DATA_KEYS["USER_PROFILE"]]: userProfile
      }

      verifyEndpointResponse(responseObj, res, endpointObj, () => {
        res.send(201).json(responseObj)
      })
    })
}

module.exports = documentUserSwipeAccept;
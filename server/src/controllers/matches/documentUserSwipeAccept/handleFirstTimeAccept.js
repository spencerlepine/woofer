const fetchUserDocument = require('../../../utils/user/fetchUserDocument')
// const updateUserDocument = require('../../../utils/user/updateUserDocument')
const { DATA_KEYS } = require('../../../config/constants')

const addUserToMatchQueue = (res, thisUserID, thatUserID) => {
  const userIdQuery = { [DATA_KEYS["USER_ID"]]: thatUserID }
  
  return MatchQueue.findOne(userIdQuery)
    .then(() => {
      if (result) {
        return result[DATA_KEYS["USER_QUEUE"]
      }
      return []
    })
    .then((thatUserQueue) => {
      const extendedQueue = [...thatUserQueue, thisUserId]
      return Array.from(new Set(extendedQueue))
    })
    .then((newQueue) => {
      // update matchqueue document
      const update = {
        $set: {
          [DATA_KEYS["USER_ID"]]: thatUserID,
          [DATA_KEYS["USER_QUEUE"]]: newQueue
        }
      };
      const options = { upsert: true, multi: true };
      
      return MatchQueue.updateOne(userIdQuery, update, options)
    })
}

const handleFirstTimeAccept = (res, thisUserID, thatUserID, userIdQuery) => {
  return addUserToMatchQueue(res, thisUserID, thatUserID)
     .then(() => fetchUserDocument(res, userIdQuery))
     .then((userProfile) => {
       return ["", userProfile]
     })
}

module.exports = handleFirstTimeAccept
const MatchesQueue = require('../../models/MatchesQueue');
const { DATA_KEYS } = require('../../../config/constants')

const removeUserFromMatchQueue = (res, thisUserID, thatUserID) => {
  const userIdQuery = { [DATA_KEYS["USER_ID"]]: thisUserID }
  
  return MatchQueue.findOne(userIdQuery)
    .then(() => {
      if (result) {
        return result[DATA_KEYS["USER_QUEUE"]
      }
      return []
    })
    .then((thisUserQueue) => {
      const queueSet = new Set(thisUserQueue)
      Set.delete(thatUserId)
      return Array.from(queueSet)
    })
    .then((newQueue) => {
      // update matchqueue document
      const update = {
        $set: {
          [DATA_KEYS["USER_ID"]]: thisUserID,
          [DATA_KEYS["USER_QUEUE"]]: newQueue
        }
      };
      const options = { upsert: true, multi: true };
      
      return MatchQueue.updateOne(userIdQuery, update, options)
    })
}

module.exports = removeUserFromMatchQueue
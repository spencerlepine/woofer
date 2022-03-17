const MatchQueue = require("../../models/MatchQueue")
const { DATA_KEYS } = require("../../../config/constants")

const removeUserFromMatchQueue = (res, thisUserId, thatUserId) => {
  const userIdQuery = { [DATA_KEYS["USER_ID"]]: thisUserId }

  return MatchQueue.findOne(userIdQuery)
    .then((result) => {
      if (result) {
        return result[DATA_KEYS["USER_QUEUE"]]
      }
      return []
    })
    .then((thisUserQueue) => {
      const queueSet = new Set(thisUserQueue)
      queueSet.delete(thatUserId)
      return Array.from(queueSet)
    })
    .then((newQueue) => {
      // update matchqueue document
      const update = {
        $set: {
          [DATA_KEYS["USER_ID"]]: thisUserId,
          [DATA_KEYS["USER_QUEUE"]]: newQueue,
        },
      }
      const options = { upsert: true, multi: true }

      return MatchQueue.updateOne(userIdQuery, update, options)
    })
}

module.exports = removeUserFromMatchQueue

const fetchUserDocument = require("../../controllerHelpers/user/fetchUserDocument")

const controllerHelpers = require("../../controllerHelpers/helpers")

const addUserToMatchQueue =
  ({ DATA_KEYS, models: { MatchQueue } }) =>
  (res, thisUserID, thatUserId) => {
    const userIdQuery = { [DATA_KEYS["USER_ID"]]: thatUserId }

    return MatchQueue.findOne(userIdQuery)
      .then((result) => {
        if (result) {
          return result[DATA_KEYS["USER_QUEUE"]]
        }
        return []
      })
      .then((thatUserQueue) => {
        const extendedQueue = [...thatUserQueue, thisUserID]
        return Array.from(new Set(extendedQueue))
      })
      .then((newQueue) => {
        // update matchqueue document
        const update = {
          $set: {
            [DATA_KEYS["USER_ID"]]: thatUserId,
            [DATA_KEYS["USER_QUEUE"]]: newQueue,
          },
        }
        const options = { upsert: true, multi: true }

        return MatchQueue.updateOne(userIdQuery, update, options)
      })
  }

const handleFirstTimeAccept = (res, thisUserID, thatUserId, userIdQuery) => {
  return addUserToMatchQueue(controllerHelpers)(res, thisUserID, thatUserId)
    .then(() => fetchUserDocument(res, userIdQuery))
    .then((userProfile) => {
      return ["none", userProfile]
    })
}

module.exports = handleFirstTimeAccept

const { getModelDocumentById } = require("../../../models/modelHelpers")

const gatherUserMatchQueue = require("../gatherUserMatchQueue")
const generateMoreQueueMatches = require("../generateMoreQueueMatches")

const QUEUE_COUNT_MIN = 5

const fetchPossibleMatch = (req, res) => {
  const reqQuery = typeof req.query === "object" ? req.query : {}
  const { userId } = reqQuery

  return gatherUserMatchQueue(userId)
    .then(({ matchQueue: userMatchQueue }) => {
      if (userMatchQueue.length <= QUEUE_COUNT_MIN) {
        return generateMoreQueueMatches(userId).then(({ matchQueue }) => {
          return matchQueue
        })
      }

      return userMatchQueue
    })
    .then((updatedMatchQueue) => {
      if (updatedMatchQueue && updatedMatchQueue[0]) {
        const possibleMatchUserId = updatedMatchQueue[0]

        return getModelDocumentById("DogUser", "userId", possibleMatchUserId)
      } else {
        return null
      }
    })
    .then((userProfile) => {
      let resultProfile = null
      if (userProfile && userProfile["userId"]) {
        resultProfile = userProfile
      }

      res.status(200).json({
        userProfile: resultProfile,
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({
        userProfile: {},
        message: "Unable to generate possible match",
        error: err,
      })
    })
}

module.exports = fetchPossibleMatch

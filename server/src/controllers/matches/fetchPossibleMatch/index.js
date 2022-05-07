const { getModelDocumentById } = require("../../../models/modelHelpers")

const gatherUserMatchQueue = require("../gatherUserMatchQueue")
const generateMoreQueueMatches = require("../generateMoreQueueMatches")

const QUEUE_COUNT_MIN = 5

const fetchPossibleMatch = (req, res) => {
  const reqQuery = typeof req.query === "object" ? req.query : {}
  const { userId: providedId } = reqQuery
  const userId = providedId + ""

  return gatherUserMatchQueue(userId)
    .then(async ({ matchQueue: userMatchQueue }) => {
      if (userMatchQueue.length <= QUEUE_COUNT_MIN) {
        const updatedMatchQueue = await generateMoreQueueMatches(userId).then(
          ({ matchQueue }) => {
            return matchQueue
          }
        )
        return updatedMatchQueue
      }

      return userMatchQueue
    })
    .then(async (updatedMatchQueue) => {
      if (updatedMatchQueue) {
        const possibleMatchUserId =
          updatedMatchQueue[Math.floor(Math.random() * updatedMatchQueue.length)]

        const userProfile = await getModelDocumentById(
          "DogUser",
          "userId",
          possibleMatchUserId
        )
        return userProfile
      }

      return null
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

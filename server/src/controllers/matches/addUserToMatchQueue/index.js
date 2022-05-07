const {
  getModelDocumentById,
  updateModelDocumentById,
  createModelDocumentById,
} = require("../../../models/modelHelpers")

const addUserToMatchQueue = (thisUserId, otherUserId) => {
  return getModelDocumentById("MatchQueue", "userId", thisUserId).then(
    (matchRecord) => {
      if (matchRecord && matchRecord["matchQueue"]) {
        const newSet = new Set([...matchRecord["matchQueue"], otherUserId])

        const updatedQueue = {
          userId: thisUserId,
        }
        updatedQueue["matchQueue"] = Array.from(newSet)

        return updateModelDocumentById(
          "MatchQueue",
          "userId",
          thisUserId,
          updatedQueue
        )
      } else {
        const newQueue = {
          userId: thisUserId,
          matchQueue: [otherUserId],
        }
        return createModelDocumentById("MatchQueue", "userId", thisUserId, newQueue)
      }
    }
  )
}

module.exports = addUserToMatchQueue

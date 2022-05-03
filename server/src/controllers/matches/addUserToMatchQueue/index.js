const {
  getModelDocumentById,
  updateModelDocumentById,
  createModelDocumentById,
} = require("../../../models/modelHelpers")

const addUserToMatchQueue = (thisUserId, otherUserId) => {
  return getModelDocumentById("MatchQueue", "userId", thisUserId).then(
    (matchRecord) => {
      if (matchRecord && matchRecord["matchQueue"]) {
        const updatedQueue = {
          ...matchRecord,
          matchQueue: [...matchRecord["matchQueue"], otherUserId],
        }
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

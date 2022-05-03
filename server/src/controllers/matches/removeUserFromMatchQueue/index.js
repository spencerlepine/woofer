const {
  getModelDocumentById,
  updateModelDocumentById,
  createModelDocumentById,
} = require("../../../models/modelHelpers")

const removeUserFromMatchQueue = (thisUserId, otherUserId) => {
  return getModelDocumentById("MatchQueue", "userId", thisUserId).then(
    (matchRecord) => {
      if (matchRecord && matchRecord["matchQueue"]) {
        const filteredList = matchRecord["matchQueue"]
          .slice()
          .filter((userId) => userId !== otherUserId)

        const updatedQueue = {
          userId: thisUserId,
          matchQueue: filteredList,
        }
        return updateModelDocumentById(
          "MatchQueue",
          "userId",
          thisUserId,
          updatedQueue
        )
      } else {
        return createModelDocumentById("MatchQueue", "userId", thisUserId, {
          userId: thisUserId,
          matchQueue: [],
        })
      }
    }
  )
}

module.exports = removeUserFromMatchQueue

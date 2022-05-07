const {
  getModelDocumentById,
  updateModelDocumentById,
  createModelDocumentById,
} = require("../../../models/modelHelpers")

const addUserToMatchQueue = (thisUserId, otherUserId) => {
  let newId = undefined
  if (thisUserId !== otherUserId) {
    newId = otherUserId
  }

  return getModelDocumentById("MatchQueue", "userId", thisUserId).then(
    (matchRecord) => {
      if (matchRecord && matchRecord["matchQueue"]) {
        const updatedQueue = {
          ...matchRecord,
          matchQueue: [...matchRecord["matchQueue"], newId],
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
          matchQueue: [newId],
        }
        return createModelDocumentById("MatchQueue", "userId", thisUserId, newQueue)
      }
    }
  )
}

module.exports = addUserToMatchQueue

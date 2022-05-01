const { getModelDocumentById } = require("../../../models/modelHelpers")

const gatherUserMatchQueue = (userId) => {
  return getModelDocumentById("MatchQueue", "userId", userId).then((queueRecord) => {
    if (queueRecord && queueRecord["matchQueue"]) {
      return {
        matchQueue,
      }
    } else {
      return {
        matchQueue: [],
      }
    }
  })
}

module.exports = gatherUserMatchQueue

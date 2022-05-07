const {
  modelHelpers: { getModelDocumentById },
} = global.testHelpers

const getUserMatchQueue = (userId) => {
  return getModelDocumentById("MatchQueue", "userId", userId).then((queueRecord) => {
    if (queueRecord && queueRecord["matchQueue"]) {
      return {
        matchQueue: queueRecord["matchQueue"],
      }
    } else {
      return {
        matchQueue: [],
      }
    }
  })
}

module.exports = getUserMatchQueue

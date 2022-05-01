const {
  getModelDocumentById,
  updateModelDocumentById,
  createModelDocumentById,
} = require("../../../models/modelHelpers")

const updateSwipeRecord = (thisUserId, thatUserId, matchStatus) => {
  return getModelDocumentById("MatchRecords", "userId", thisUserId).then(
    (matchRecordDoc) => {
      const matchRecord = {
        userId: thisUserId,
      }

      let updatedRecords = {}
      if (matchRecordDoc.userMatches) {
        updatedRecords = matchRecordDoc.userMatches
      }

      updatedRecords[thatUserId] = matchStatus
      matchRecord["userMatches"] = updatedRecords

      if (matchRecordDoc.userMatches) {
        return updateModelDocumentById(
          "MatchRecords",
          "userId",
          thisUserId,
          matchRecord
        )
      } else {
        return createModelDocumentById(
          "MatchRecords",
          "userId",
          thisUserId,
          matchRecord
        )
      }
    }
  )
}

module.exports = updateSwipeRecord

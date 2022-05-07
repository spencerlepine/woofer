const {
  getModelDocumentById,
  updateModelDocumentById,
  createModelDocumentById,
} = require("../../../models/modelHelpers")

const updateSwipeRecord = (thisUserId, thatUserId, matchStatus) => {
  return getModelDocumentById("MatchRecords", "userId", thisUserId).then(
    (matchRecordDoc) => {
      const existingDoc = matchRecordDoc && matchRecordDoc.userMatches !== undefined

      const matchRecord = {
        userId: thisUserId,
      }

      let updatedRecords = {}
      if (typeof matchRecordDoc.userMatches === "object") {
        updatedRecords = Object.assign(matchRecordDoc.userMatches)
      }

      updatedRecords[thatUserId] = matchStatus
      matchRecord["userMatches"] = updatedRecords

      if (existingDoc) {
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

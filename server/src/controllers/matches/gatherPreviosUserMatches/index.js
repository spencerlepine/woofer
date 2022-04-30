const { getModelDocumentById } = require("../../../models/modelHelpers")

const gatherPreviousUserMatches = (userId) => {
  return getModelDocumentById("MatchRecords", "userId", userId).then(
    (matchRecord) => {
      if (matchRecord && matchRecord["userMatches"]) {
        return matchRecord
      }
      return {
        userMatches: {},
      }
    }
  )
}

module.exports = gatherPreviousUserMatches

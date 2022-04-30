const { getModelDocumentById } = require("../../../models/modelHelpers")

const calculateMatchStatus = (thisUserId, thatUserId) => {
  let userAChoice = "none"
  let userBChoice = "none"

  return getModelDocumentById("MatchRecords", "userId", thisUserId)
    .then((matchRecord) => {
      if (matchRecord && matchRecord["userMatches"]) {
        const matches = matchRecord["userMatches"]
        userChoiceA = matches[thatUserID]
      }
    })
    .then(() => getModelDocumentById("MatchRecords", "userId", thatUserId))
    .then((matchRecord) => {
      if (matchRecord && matchRecord["userMatches"]) {
        const matches = matchRecord["userMatches"]
        userChoiceB = matches[thatUserID]
      }
    })
    .then(() => {
      const responseObj = {
        [thisUserId]: userAChoice,
        [thatUserId]: userBChoice,
      }

      return responseObj
    })
}

module.exports = calculateMatchStatus

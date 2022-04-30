const { getModelDocumentById } = require("../../../models/modelHelpers")

const fetchMatchStatus = (req, res) => {
  const reqQuery = typeof req.query === "object" ? req.query : {}
  const { thisUserId, thatUserId } = reqQuery

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

      res.status(201).json(responseObj)
    })
    .catch((err) =>
      res.status(500).json({
        message: "Unable to create new chat room",
        error: JSON.stringify(err),
      })
    )
}

module.exports = fetchMatchStatus

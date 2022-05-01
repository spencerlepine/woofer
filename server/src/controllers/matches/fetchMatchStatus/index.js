const { getModelDocumentById } = require("../../../models/modelHelpers")

const gatherMatchStatus = require("../gatherMatchStatus")

const fetchMatchStatus = (req, res) => {
  const reqQuery = typeof req.query === "object" ? req.query : {}
  const { thisUserId, thatUserId } = reqQuery

  return gatherMatchStatus(thisUserId, thatUserId)
    .then((matchStatus) => {
      res.status(200).json(matchStatus)
    })
    .catch((err) =>
      res.status(500).json({
        message: "Unable to fetch match status",
        error: err,
      })
    )
}

module.exports = fetchMatchStatus

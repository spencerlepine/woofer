const { getModelDocumentById } = require("../../../models/modelHelpers")

const fetchMatchQueue = (req, res) => {
  const reqQuery = typeof req.query === "object" ? req.query : {}
  const { userId } = reqQuery

  return getModelDocumentById("MatchQueue", "userId", userId)
    .then((queueRecord) => {
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
    .then((responseObj) => res.status(200).json(responseObj))
    .catch((err) =>
      res.status(500).json({
        message: "Unable to fetch match queue",
        error: err,
      })
    )
}

module.exports = fetchMatchQueue

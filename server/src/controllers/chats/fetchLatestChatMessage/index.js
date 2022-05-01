const { getModelDocumentById } = require("../../../models/modelHelpers")

const fetchLatestChatMessage = (req, res) => {
  const reqQuery = typeof req.query === "object" ? req.query : {}
  const { chatId } = reqQuery

  return getModelDocumentById("Chat", "chatId", chatId)
    .then(({ latestMessage }) => {
      res.status(200).json({
        message: latestMessage,
      })
    })
    .catch((err) =>
      res.status(500).json({
        message: "Unable to find latest chat message",
        error: err,
      })
    )
}

module.exports = fetchLatestChatMessage

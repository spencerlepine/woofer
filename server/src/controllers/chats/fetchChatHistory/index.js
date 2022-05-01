const { gatherChatHistory } = require("../gatherChatHistory")
const { getModelDocumentById } = require("../../../models/modelHelpers")

const fetchChatHistory = (req, res) => {
  const reqQuery = typeof req.query === "object" ? req.query : {}
  const { chatId } = reqQuery

  return getModelDocumentById("Chat", "chatId", chatId)
    .then(({ chatMessages }) => {
      res.status(200).json({
        chatMessages: chatMessages,
      })
    })
    .catch((err) =>
      res.status(500).json({
        message: "Unable to find chat history",
        error: err,
      })
    )
}

module.exports = fetchChatHistory

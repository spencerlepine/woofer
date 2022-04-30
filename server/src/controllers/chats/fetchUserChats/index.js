const { getModelDocumentById } = require("../../../models/modelHelpers")

const fetchUserChats = (req, res) => {
  const { chatId } = req.query

  return getModelDocumentById("ChatMessages", "chatId", chatId)
    .then(({ chatMessages }) => {
      res.status(200).json({
        chatMessages: chatMessages,
      })
    })
    .catch((err) =>
      res.status(500).json({
        message: "Unable to chat message",
        error: JSON.stringify(err),
      })
    )
}

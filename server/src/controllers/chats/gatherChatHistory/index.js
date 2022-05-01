const { getModelDocumentById } = require("../../../models/modelHelpers")

const gatherChatHistory = (chatId) => {
  return getModelDocumentById("Chat", "chatId", chatId).then((chatRecord) => {
    if (chatRecord && chatRecord["chatId"]) {
      return chatRecord
    } else {
      return {
        chatId,
        chatMessages: [],
        message: "Unable to find chat history!",
      }
    }
  })
}

module.exports = gatherChatHistory

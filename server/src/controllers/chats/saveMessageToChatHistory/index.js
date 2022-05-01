const {
  getModelDocumentById,
  createModelDocumentById,
  updateModelDocumentById,
} = require("../../../models/modelHelpers")

const saveMessageToChatHistory = (chatId, message) => {
  return getModelDocumentById("Chat", "chatId", chatId).then((chatRecord) => {
    if (chatRecord && chatRecord["chatId"]) {
      const { chatMessages } = chatRecord
      const extendedMessages = chatMessages.slice().concat(message)

      const updatedChat = {
        chatId,
        chatMessages: extendedMessages,
      }

      return updateModelDocumentById("Chat", "chatId", chatId, updatedChat)
    } else {
      const newChatRecord = {
        chatId,
        chatMessages: [message],
      }

      return createModelDocumentById("Chat", "chatId", chatId, newChatRecord)
    }
  })
}

module.exports = saveMessageToChatHistory

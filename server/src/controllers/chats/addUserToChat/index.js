const {
  getModelDocumentById,
  updateModelDocumentById,
} = require("../../../models/modelHelpers")

const generateChatRoomId = require("../generateChatRoomId")

const addUserToChat = (chatId, thisUserId, thatuserId) => {
  const chatObj = {
    chatId: chatId,
    otherUserId: thatuserId,
  }

  return getModelDocumentById("DogUser", "userId", thisUserId).then(
    (userProfile) => {
      const { chats } = userProfile

      const updatedChats = chats || []
      updatedChats.push(chatObj)

      const updatedProfile = {
        ...userProfile,
        chats: updatedChats,
      }

      return updateModelDocumentById("DogUser", "userId", thisUserId, updatedProfile)
    }
  )
}

module.exports = addUserToChat

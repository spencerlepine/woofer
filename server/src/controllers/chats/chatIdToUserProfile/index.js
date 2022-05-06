const {
  getModelDocumentById,
  updateModelDocumentById,
} = require("../../../models/modelHelpers")

const chatIdToUserProfile = (chatId, thisUserId, thatUserId) => {
  const chatObj = {
    chatId: chatId,
    otherUserId: thatUserId,
  }

  return getModelDocumentById("DogUser", "userId", thisUserId).then(
    (userProfile) => {
      console.log(userProfile)

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

module.exports = chatIdToUserProfile

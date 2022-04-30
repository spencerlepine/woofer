const {
  getModelDocumentById,
  updateModelDocumentById,
  deleteModelDocumentById,
} = require("../../../models/modelHelpers")

const removeUserFromChat = (chatId, thisUserId) => {
  return deleteModelDocumentById("Chat", "chatId", chatId)
    .then(() => getModelDocumentById("DogUser", "userId", thisUserId))
    .then((userProfile) => {
      const { chats } = userProfile

      const chatsArray = chats || []
      const filteredChats = chatsArray.filter(
        ({ chatId: thisChatId }) => thisChatId !== chatId
      )

      const updatedProfile = {
        ...userProfile,
        chats: filteredChats,
      }

      return updateModelDocumentById("DogUser", "userId", thisUserId, updatedProfile)
    })
}

module.exports = removeUserFromChat

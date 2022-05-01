const {
  getModelDocumentById,
  updateModelDocumentById,
  deleteModelDocumentById,
} = require("../../../models/modelHelpers")

const removeChatFromList = require("./removeChatFromList")

const removeUserFromChat = (chatId, thisUserId) => {
  return deleteModelDocumentById("Chat", "chatId", chatId)
    .then(() => getModelDocumentById("DogUser", "userId", thisUserId))
    .then((userProfile) => {
      const { chats } = userProfile

      const chatsArray = chats || []
      const filteredChats = removeChatFromList(chatId, chatsArray)

      const updatedProfile = new Object(userProfile)
      updatedProfile["chats"] = filteredChats

      return updateModelDocumentById("DogUser", "userId", thisUserId, updatedProfile)
    })
}

module.exports = removeUserFromChat

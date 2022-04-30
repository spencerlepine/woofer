const fetchUserDocument = require("../../controllerHelpers/user/fetchUserDocument")
const updateUserDocument = require("../../controllerHelpers/user/updateUserDocument")
const { DATA_KEYS } = require("../../../../config/constants")

const addChatIdToUserProfile = require("../../controllerHelpers/chats/addChatIdToUserProfile")
const generateTwoUserChat = require("../../controllerHelpers/chats/generateTwoUserChat")
const removeUserFromMatchQueue = require("../../controllerHelpers/matches/removeUserFromMatchQueue")

const handleMutualAccept = (res, thisUserID, thatUserId) => {
  return removeUserFromMatchQueue(res, thisUserID, thatUserId)
    .then(() => {
      return generateTwoUserChat(res, thisUserID, thatUserId)
    })
    .then((chatId) => {
      const thisChatObj = {
        [DATA_KEYS["CHAT_ID"]]: chatId,
        otherUserId: thatUserId,
      }

      const thatChatObj = {
        [DATA_KEYS["CHAT_ID"]]: chatId,
        otherUserId: thisUserID,
      }

      return addChatIdToUserProfile(
        res,
        thisUserID,
        thisChatObj,
        DATA_KEYS["USER_ID"]
      )
        .then(() => {
          return addChatIdToUserProfile(
            res,
            thatUserId,
            thatChatObj,
            DATA_KEYS["USER_ID"]
          )
        })
        .then(() => chatId)
    })
    .then((chatId) => {
      return fetchUserDocument(res, { [DATA_KEYS["USER_ID"]]: thatUserId }).then(
        (userProfile) => {
          return [chatId, userProfile]
        }
      )
    })
}

module.exports = handleMutualAccept

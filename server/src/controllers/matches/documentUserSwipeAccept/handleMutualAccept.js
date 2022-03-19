const fetchUserDocument = require("../../controllerHelpers/user/fetchUserDocument")
const updateUserDocument = require("../../controllerHelpers/user/updateUserDocument")
const { DATA_KEYS } = require("../../../../config/constants")

const addChatIdToUserProfile = require("../../controllerHelpers/chats/addChatIdToUserProfile")
const generateTwoUserChat = require("../../controllerHelpers/chats/generateTwoUserChat")
const removeUserFromMatchQueue = require("../../controllerHelpers/matches/removeUserFromMatchQueue")

const handleMutualAccept = (res, thisUserID, thatUserID) => {
  return removeUserFromMatchQueue(res, thisUserID, thatUserID)
    .then(() => {
      return generateTwoUserChat(res, thisUserID, thatUserID)
    })
    .then((chatId) => {
      return addChatIdToUserProfile(res, thisUserID, chatId, DATA_KEYS["USER_ID"])
        .then(() => {
          return addChatIdToUserProfile(
            res,
            thatUserID,
            chatId,
            DATA_KEYS["USER_ID"]
          )
        })
        .then(() => chatId)
    })
    .then((chatId) => {
      return fetchUserDocument(res, { [DATA_KEYS["USER_ID"]]: thatUserID }).then(
        (userProfile) => {
          return [[chatId, userProfile]]
        }
      )
    })
}

module.exports = handleMutualAccept

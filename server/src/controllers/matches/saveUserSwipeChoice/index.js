const { getModelDocumentById } = require("../../../models/modelHelpers")

const isMutualMatch = require("./isMutualMatch")
const gatherMatchStatus = require("../gatherMatchStatus")
const updateSwipeRecord = require("../updateSwipeRecord")

const addUserToChat = require("../../chats/addUserToChat")
const generateChatRoomId = require("../../chats/generateChatRoomId")

const saveUserSwipeChoice = (req, res) => {
  const reqQuery = typeof req.query === "object" ? req.query : {}
  const { thisUserId, thatUserId, matchStatus } = reqQuery

  let chatIdResult = "none"

  return updateSwipeRecord(thisUserId, thatUserId, matchStatus)
    .then(() => gatherMatchStatus(thisUserId, thatUserId))
    .then((matchStatusObj) => {
      const isMutual = isMutualMatch(matchStatusObj)

      return isMutual
    })
    .then((isMutual) => {
      if (isMutual) {
        const newChatId = generateChatRoomId()
        chatIdResult = newChatId

        return addUserToChat(thisUserId, thatUserId, newChatId)
          .then(() => addUserToChat(thatUserId, thisUserId, newChatId))
          .then(() => newChatId)
      }
    })
    .then((chatId) => {
      if (chatId) {
        chatIdResult = chatId
        return getModelDocumentById("DogUser", "userId", thatUserId)
      }
    })
    .then((result) => {
      let userProfile = {}
      if (result && result.userProfile) {
        userProfile = result.userProfile
      }
      return userProfile
    })
    .then((userProfile) => {
      const responseObj = {
        chatId: chatIdResult,
        userProfile: userProfile,
      }

      res.status(201).json(responseObj)
    })
    .catch((err) => {
      res.status(500).json({
        message: "Unable to save user swipe choice",
        error: err,
      })
    })
}

module.exports = saveUserSwipeChoice

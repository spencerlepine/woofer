const { getModelDocumentById } = require("../../../models/modelHelpers")

const isMutualMatch = require("./isMutualMatch")
const gatherMatchStatus = require("../gatherMatchStatus")
const updateSwipeRecord = require("../updateSwipeRecord")
const addUserToMatchQueue = require("../addUserToMatchQueue")
const removeUserFromMatchQueue = require("../removeUserFromMatchQueue")

const addUserToChat = require("../../chats/addUserToChat")
const chatIdToUserProfile = require("../../chats/chatIdToUserProfile")
const generateChatRoomId = require("../../chats/generateChatRoomId")

const isFirstTimeMatch = (matchObj) => {
  try {
    if (typeof matchObj === "object" && Object.keys(matchObj).length === 2) {
      const userChoices = Object.values(matchObj)
      return (
        userChoices.some((choice) => choice === "accept") &&
        userChoices.some((choice) => choice === "none")
      )
    }
    return false
  } catch (err) {
    return false
  }
}

const saveUserSwipeChoice = (req, res) => {
  const reqBody = typeof req.body === "object" ? req.body : {}
  const { thisUserId, thatUserId, matchStatus } = reqBody

  let chatIdResult = "none"

  return updateSwipeRecord(thisUserId, thatUserId, matchStatus)
    .then(() => {
      if (matchStatus === "reject") {
        return removeUserFromMatchQueue(thatUserId, thisUserId).then(() =>
          removeUserFromMatchQueue(thisUserId, thatUserId)
        )
      }
      if (matchStatus === "accept") {
        return removeUserFromMatchQueue(thisUserId, thatUserId)
      }
    })
    .then(() => gatherMatchStatus(thisUserId, thatUserId))
    .then((matchStatusObj) => {
      const isMutual = isMutualMatch(matchStatusObj)

      const isFirstMatch = isFirstTimeMatch(matchStatusObj)

      return [isFirstMatch, isMutual]
    })
    .then(([isFirstMatch, isMutual]) => {
      const newChatId = generateChatRoomId()
      chatIdResult = newChatId

      const createChatPromise = removeUserFromMatchQueue(thisUserId, thatUserId)
        .then(() => removeUserFromMatchQueue(thatUserId, thisUserId))
        .then(() => addUserToChat(newChatId, thisUserId, thatUserId))
        .then(() => addUserToChat(newChatId, thatUserId, thisUserId))
        .then(() => newChatId)

      const addToQueuePromise = addUserToMatchQueue(thatUserId, thisUserId).then(
        () => {}
      )

      return isMutual ? createChatPromise : addToQueuePromise
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

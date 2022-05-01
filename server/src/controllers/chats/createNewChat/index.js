const addUserToChat = require("../addUserToChat")

const generateChatRoomId = require("../generateChatRoomId")

const createNewChat = (req, res) => {
  const reqBody = typeof req.body === "object" ? req.body : {}
  const { thisUserId, thatUserId } = reqBody

  const newChatId = generateChatRoomId()

  return addUserToChat(thisUserId, thatUserId, newChatId)
    .then(() => addUserToChat(thatUserId, thisUserId, newChatId))
    .then(() => {
      res.status(201).json({
        chatId: newChatId,
      })
    })
    .catch((err) =>
      res.status(500).json({
        message: "Unable to create new chat room",
        error: err,
      })
    )
}

module.exports = createNewChat

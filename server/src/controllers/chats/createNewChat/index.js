const addUserToChat = require("../addUserToChat")

const createNewChat = (req, res) => {
  const { thisUserId, thatUserId } = req.body

  const newChatId = generateChatRoomId()

  addUserToChat(thisUserId, thatUserId, chatId)
    .then(() => addUserToChat(thatUserId, thisUserId, chatId))
    .then(() => {
      res.status(201).json({
        chatId: newChatId,
      })
    })
    .catch((err) =>
      res.status(500).json({
        message: "Unable to create new chat room",
        error: JSON.stringify(err),
      })
    )
}

module.exports = createNewChat

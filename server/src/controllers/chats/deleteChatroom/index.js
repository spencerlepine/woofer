const removeUserFromChat = require("../removeUserFromChat")

const deleteChatRoom = (req, res) => {
  const { thisUserId, thatUserId } = req.body

  removeUserFromChat(chatId, thisUserId)
    .then(() => removeUserFromChat(chatId, thatUserId))
    .then(() => {
      res.status(200).json({
        message: "Successfuly delete chat room",
      })
    })
    .catch((err) =>
      res.status(500).json({
        message: "Unable to delete new chat room",
        error: JSON.stringify(err),
      })
    )
}

module.exports = deleteChatRoom

const removeUserFromChat = require("../removeUserFromChat")

const deleteChatRoom = (req, res) => {
  const reqQuery = typeof req.query === "object" ? req.query : {}
  const { thisUserId, thatUserId, chatId } = reqQuery

  return removeUserFromChat(chatId, thisUserId)
    .then(() => removeUserFromChat(chatId, thatUserId))
    .then(() => {
      res.status(200).json({
        message: "Successfuly delete chat room",
      })
    })
    .catch((err) =>
      res.status(500).json({
        message: "Unable to delete new chat room",
        error: err,
      })
    )
}

module.exports = deleteChatRoom

const express = require("express")
const {
  addUserToChat,
  fetchUserChats,
  deleteChatRoom,
} = require("../../controllers/chats")

const router = express.Router()

router.post("/create", addUserToChat)
router.post("/fetch", fetchUserChats)
router.delete("/delete", deleteChatRoom)

module.exports = router

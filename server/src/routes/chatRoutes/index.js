const express = require("express")
const {
  addUserToChat,
  fetchUserChats,
  fetchChatHistory,
  deleteChatRoom,
  createNewChat,
  fetchLatestChatMessage,
} = require("../../controllers/chats")

const router = express.Router()

router.get("/history", fetchChatHistory)
router.get("/last", fetchLatestChatMessage)
router.post("/create", createNewChat)
router.get("/fetch", fetchUserChats)
router.delete("/delete", deleteChatRoom)

module.exports = router

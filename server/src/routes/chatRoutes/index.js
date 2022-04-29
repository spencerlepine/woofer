const express = require("express")
const { addUserToChat, fetchUserChats } = require("../../controllers/chats")
const { DATA_KEYS, ENDPOINT_ROUTES } = require("../../../config/constants")

const router = express.Router()

router.post("/create", addUserToChat)
router.post("/fetch", fetchUserChats)

module.exports = router

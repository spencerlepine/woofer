const express = require("express")
const { addUserToChat } = require("../../controllers/chats")
const { DATA_KEYS, ENDPOINT_ROUTES } = require("../../../config/constants")

const router = express.Router()

router.post("/create", addUserToChat)

module.exports = router

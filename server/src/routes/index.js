const express = require("express")
const chatsRoutes = require("./chatRoutes")
const signupRoutes = require("./signupRoutes")
const statusRoutes = require("./statusRoutes")
const zipcodesRoutes = require("./zipcodesRoutes")
const matchesRoutes = require("./matchesRoutes")
const profileRoutes = require("./profileRoutes")

const router = express.Router()

router.use("/signup", signupRoutes)
router.use("/zipcodes", zipcodesRoutes)
router.use("profile", profileRoutes)
router.use("matches", matchesRoutes)
router.use("/chats", chatsRoutes)
router.use("/status", statusRoutes)

module.exports = router

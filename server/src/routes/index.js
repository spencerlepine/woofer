const express = require("express")
const signupRoutes = require("./signupRoutes")
const zipcodesRoutes = require("./zipcodesRoutes")
const profileRoutes = require("./profileRoutes")
const matchesRoutes = require("./matchesRoutes")
const chatsRoutes = require("./chatRoutes")

const config = require("../../config/config")
const { ENDPOINT_ROUTES } = require("../../config/constants")

const router = express.Router()

router.use(`/${ENDPOINT_ROUTES["SIGNUP"]["URL"]}`, signupRoutes)
router.use(`/${ENDPOINT_ROUTES["ZIPCODES"]["URL"]}`, zipcodesRoutes)
router.use(`/${ENDPOINT_ROUTES["PROFILE"]["URL"]}`, profileRoutes)
router.use(`/${ENDPOINT_ROUTES["MATCHES"]["URL"]}`, matchesRoutes)
router.use("/chats", chatsRoutes)

module.exports = router

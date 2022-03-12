const express = require("express")
const signupRoutes = require("./signupRoutes")
const zipcodesRoutes = require("./zipcodesRoutes")
const profileRoutes = require("./profileRoutes")
const matchesRoutes = require("./matchesRoutes")
const config = require("../../config/config")

const router = express.Router()

router.use("/signup", signupRoutes)
router.use("/zipcodes", zipcodesRoutes)
router.use("/profile", profileRoutes)
router.use("/matches", matchesRoutes)

module.exports = router

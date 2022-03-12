const express = require("express")
const signupRoutes = require("./signupRoutes")
const exampleRoutes = require("./exampleRoutes")
const config = require("../../config/config")

const router = express.Router()

router.use("/signup", signupRoutes)
router.use("/example", exampleRoutes)

module.exports = router

const express = require("express")
const { signupUser } = require("../../controllers/signup")

const router = express.Router()

router.post("/", signupUser)

module.exports = router

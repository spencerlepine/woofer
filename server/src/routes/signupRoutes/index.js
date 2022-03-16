const express = require("express")
const { signupUser } = require("../../controllers/signup")
// const {ENDPOINT_ROUTES} = require('../../config/constants')
// const PATH_CONSTANT = ENDPOINT_ROUTES["SIGNUP"]

const router = express.Router()

router.post("/", signupUser)

module.exports = router

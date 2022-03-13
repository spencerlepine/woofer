const express = require("express")
const signupRoutes = require("./signupRoutes")
const zipcodesRoutes = require("./zipcodesRoutes")
const profileRoutes = require("./profileRoutes")
const matchesRoutes = require("./matchesRoutes")
const config = require("../../config/config")
const { ENDPOINT_ROUTES } = require('../../config/constants')

const router = express.Router()

router.use(`/${ENDPOINT_ROUTES["SIGNUP"]}`, signupRoutes)
router.use(`/${ENDPOINT_ROUTES["ZIPCODES"]}`, zipcodesRoutes)
router.use(`/${ENDPOINT_ROUTES["PROFILE"]}`, profileRoutes)
router.use(`/${ENDPOINT_ROUTES["MATCHES"]}`, matchesRoutes)

module.exports = router

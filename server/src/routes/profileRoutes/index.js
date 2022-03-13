const express = require("express")
const {
  getUserProfile,
  getFullUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../../controllers/profile")
const { DATA_KEYS, ENDPOINT_ROUTES } = require('../../../config/constants')
const PATH_CONSTANT = ENDPOINT_ROUTES["PROFILE"]

const router = express.Router()

router.get("", getUserProfile)
router.get(`/${PATH_CONSTANT["DETAILS"]["URL"]}`, getFullUserProfile)
router.post(`/${PATH_CONSTANT["DETAILS"]["URL"]}`, updateUserProfile)
router.delete(`/${PATH_CONSTANT["DETAILS"]["URL"]}`, deleteUserProfile)

module.exports = router

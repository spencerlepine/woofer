const express = require("express")
const {
  fetchPossibleMatch,
  saveUserSwipeChoice,
} = require("../../controllers/matches")
const { DATA_KEYS, ENDPOINT_ROUTES } = require('../../../config/constants')
const PATH_CONSTANT = ENDPOINT_ROUTES["MATCHES"]

const router = express.Router()

router.get(`/${PATH_CONSTANT["GENERATE"]["URL"]}`, fetchPossibleMatch)
router.post(`/${PATH_CONSTANT["SWIPE"]["URL"]}`, saveUserSwipeChoice)

module.exports = router

const express = require("express")
const {
  fetchPossibleMatch,
  saveUserSwipeChoice,
  fetchMatchStatus,
  fetchMatchQueue,
} = require("../../controllers/matches")
const { DATA_KEYS, ENDPOINT_ROUTES } = require("../../../config/constants")
const PATH_CONSTANT = ENDPOINT_ROUTES["MATCHES"]

const router = express.Router()

router.get(`/${PATH_CONSTANT["QUEUE"]["URL"]}`, fetchMatchQueue)
router.get(`/${PATH_CONSTANT["STATUS"]["URL"]}`, fetchMatchStatus)
router.get(`/${PATH_CONSTANT["GENERATE"]["URL"]}`, fetchPossibleMatch)
router.post(`/${PATH_CONSTANT["SWIPE"]["URL"]}`, saveUserSwipeChoice)

module.exports = router

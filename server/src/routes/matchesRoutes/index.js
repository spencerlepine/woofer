const express = require("express")
const {
  fetchPossibleMatch,
  saveUserSwipeChoice,
  fetchMatchStatus,
  fetchMatchQueue,
} = require("../../controllers/matches")

const router = express.Router()

router.get("/queue", fetchMatchQueue)
router.get("/queue", fetchMatchStatus)
router.get("/queue", fetchPossibleMatch)
router.post("/swipe", saveUserSwipeChoice)

module.exports = router

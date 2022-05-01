const express = require("express")
const {
  fetchPossibleMatch,
  saveUserSwipeChoice,
  fetchMatchStatus,
  fetchMatchQueue,
} = require("../../controllers/matches")

const router = express.Router()

router.get("/queue", fetchMatchQueue)
router.get("/status", fetchMatchStatus)
router.get("/generate", fetchPossibleMatch)
router.post("/swipe", saveUserSwipeChoice)

module.exports = router

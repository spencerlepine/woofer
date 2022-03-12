const express = require("express")
const {
  fetchPossibleMatch,
  saveUserSwipeChoice,
} = require("../../controllers/matches")

const router = express.Router()

router.get("/generate", fetchPossibleMatch)
router.post("/swipe", saveUserSwipeChoice)

module.exports = router

const express = require("express")
const {
  getUserProfile,
  getFullUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../../controllers/profile")

const router = express.Router()

router.get("/", getUserProfile)
router.get("/details", getFullUserProfile)
router.post("/details", updateUserProfile)
router.delete("/details", deleteUserProfile)

module.exports = router

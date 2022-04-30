const express = require("express")
const {
  fetchUserProfile,
  fetchFullUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../../controllers/profile")

const router = express.Router()

router.get("", fetchUserProfile)
router.get("/details", fetchFullUserProfile)
router.post("/details", updateUserProfile)
router.delete("/details", deleteUserProfile)

module.exports = router

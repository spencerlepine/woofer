const express = require("express")
const {
  addUserZipCode,
  removeUserZipCode,
  fetchZipCodePool,
} = require("../../controllers/zipcodes")

const router = express.Router()

router.get("/all", fetchZipCodePool)
router.post("/add", addUserZipCode)
router.delete("/remove", removeUserZipCode)

module.exports = router

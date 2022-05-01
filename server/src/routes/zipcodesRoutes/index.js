const express = require("express")
const { addUserZipCode, removeUserZipCode } = require("../../controllers/zipcodes")

const router = express.Router()

router.post("/add", addUserZipCode)
router.delete("/remove", removeUserZipCode)

module.exports = router

const express = require("express")
const {
  addUserZipCode,
  removeUserZipCode,
  fetchZipCodePool,
} = require("../../controllers/zipcodes")
const { ENDPOINT_ROUTES } = require('../../../config/constants')
const PATH_CONSTANT = ENDPOINT_ROUTES["ZIPCODES"]

const router = express.Router()

router.post("/add", addUserZipCode)
router.delete("/remove", removeUserZipCode)
router.get(`/${PATH_CONSTANT["ALL"]}`, fetchZipCodePool)

module.exports = router

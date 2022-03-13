const express = require("express")
const {
  addUserZipCode,
  removeUserZipCode,
  fetchZipCodePool,
} = require("../../controllers/zipcodes")
const { ENDPOINT_ROUTES } = require('../../../config/constants')
const PATH_CONSTANT = ENDPOINT_ROUTES["ZIPCODES"]

const router = express.Router()

router.get(`/${PATH_CONSTANT["ALL"]["URL"]}`, fetchZipCodePool)
router.post(`/${PATH_CONSTANT["ADD"]["URL"]}`, addUserZipCode)
router.delete(`/${PATH_CONSTANT["REMOVE"]["URL"]}`, removeUserZipCode)

module.exports = router

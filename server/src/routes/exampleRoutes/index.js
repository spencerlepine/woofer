const express = require("express")
const {
  exampleController
} = require("../../controllers/example")

const router = express.Router()

router.get("/abc", exampleController)

module.exports = router

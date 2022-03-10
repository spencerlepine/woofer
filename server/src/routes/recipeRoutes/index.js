const express = require("express")
const { fetchSeveralRecipies } = require("../../controllers/recipes")

const router = express.Router()

router.get("/random", fetchSeveralRecipies)

module.exports = router

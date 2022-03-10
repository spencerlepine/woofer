const express = require("express")
const { findItemReplacement } = require("../../controllers/products")

const router = express.Router()

router.use("/find-replacement", findItemReplacement)

module.exports = router

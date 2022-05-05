const express = require("express")
const router = express.Router()
const db = require("../../database")

router.get("/", (req, res) => {
  const connection = db.isConnected() ? "running" : "disconnected"
  res.status(200).json({ status: "running", mongo: connection })
})

module.exports = router

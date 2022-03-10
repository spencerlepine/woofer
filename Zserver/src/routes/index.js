const express = require("express")
const listRoutes = require("./listRoutes")
const productsRoutes = require("./productsRoutes")
const recipeRoutes = require("./recipeRoutes")
const config = require("../../config/config")

const router = express.Router()

router.use("/list", listRoutes)
router.use("/products", productsRoutes)
router.use("/recipes", recipeRoutes)

module.exports = router

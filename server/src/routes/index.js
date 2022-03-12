const express = require("express")
const listRoutes = require("./listRoutes")
const productsRoutes = require("./productsRoutes")
const recipeRoutes = require("./recipeRoutes")
const exampleRoutes = require("./exampleRoutes")
const config = require("../../config/config")

const router = express.Router()

router.use("/list", listRoutes)
router.use("/products", productsRoutes)
router.use("/recipes", recipeRoutes)
router.use("/example", exampleRoutes)

module.exports = router

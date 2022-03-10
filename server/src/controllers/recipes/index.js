const axios = require("axios")
const config = require("../../../config/config")

// https://world.openfoodfacts.org/api/v0/product/737628064502.json

const options = {
  headers: {
    "content-type": "application/json",
  },
}

const apiKey = config.SPOONACULAR_API_KEY
const spoonacularURL = "https://api.spoonacular.com"

const fetch = (req, res, url, params, data, method) =>
  axios
    .request({
      ...options,
      params: {
        ...params,
        apiKey,
      },
      data,
      url: `${spoonacularURL}${url}`,
      method,
    })
    .then((response) => response.data)
    .catch((err) => {
      res.status(500).send(err)
    })

module.exports = {
  fetchSeveralRecipies: (req, res) => {
    fetch(req, res, "/recipes/random", { number: 8 }, {}, "GET").then(
      ({ recipes }) => {
        res.status(200).json(recipes)
      }
    )
  },
}

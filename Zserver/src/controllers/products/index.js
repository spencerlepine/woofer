const axios = require("axios")
// const config = require('../../config/config');

// https://world.openfoodfacts.org/api/v0/product/737628064502.json

const options = {
  headers: {
    "content-type": "application/json",
  },
}
const baseURL = "https://en.openfoodfacts.org"

const fetch = (req, res, url, params, data, method) =>
  axios
    .request({
      ...options,
      params,
      data,
      url: `${baseURL}${url}`,
      method,
    })
    .then((response) => response.data)
    .catch((err) => {
      res.status(500).send(err)
    })

module.exports = {
  findItemReplacement: (req, res) => {
    if (!req.params.category) {
      res.status(400).send("Must specify category")
    }

    function getRandomInt(min, max) {
      const nmin = Math.ceil(min)
      const nmax = Math.floor(max)
      return Math.floor(Math.random() * (max - nmin + 1)) + nmin
    }

    fetch(
      req,
      res,
      `/category/${req.params.category}/${getRandomInt(1, 5)}.json?lc=en`,
      {},
      {},
      "GET"
    ).then(({ products }) => {
      const newProduct = products[getRandomInt(0, products.length)]
      res.status(200).json(newProduct)
    })
  },
}

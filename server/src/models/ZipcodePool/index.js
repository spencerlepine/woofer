const mongoose = require("mongoose")
const { DATA_KEYS } = require("../../../config/constants")

const zipcodePoolSchema = new mongoose.Schema({
  [DATA_KEYS["ZIPCODE_ID"]]: {
    type: String,
    required: true,
  },
  [DATA_KEYS["POOL_USERS"]]: {
    type: Object,
    required: true,
  },
})

module.exports = mongoose.model("ZipcodePool", zipcodePoolSchema)

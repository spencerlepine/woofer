const mongoose = require("mongoose")
const { DATA_KEYS } = require('../../../config/constants')

const matchQueueSchema = new mongoose.Schema({
  [DATA_KEYS["USER_ID"]]: {
    type: String,
    required: true,
  },
  [DATA_KEYS["USER_QUEUE"]]: {
    type: Object,
    required: true,
  }
})

module.exports = mongoose.model("MatchQueue", matchQueueSchema)
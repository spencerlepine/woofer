const mongoose = require("mongoose")
const { DATA_KEYS } = require("../../../config/constants")

const matchRecordsSchema = new mongoose.Schema({
  [DATA_KEYS["USER_ID"]]: {
    type: String,
    required: true,
  },
  [DATA_KEYS["USER_MATCHES"]]: {
    type: Object,
    required: true,
  },
})

module.exports = mongoose.model("MatchRecords", matchRecordsSchema)

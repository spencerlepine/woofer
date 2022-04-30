const mongoose = require("mongoose")

const matchRecordsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userMatches: {
    type: Object,
    required: true,
  },
})

module.exports = mongoose.model("MatchRecords", matchRecordsSchema)

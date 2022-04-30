const mongoose = require("mongoose")

const matchQueueSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  matchQueue: {
    type: Object,
    required: true,
  },
})

module.exports = mongoose.model("MatchQueue", matchQueueSchema)

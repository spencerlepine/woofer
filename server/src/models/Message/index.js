const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
  messageId: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model("Message", messageSchema)

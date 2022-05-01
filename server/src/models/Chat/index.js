const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
  chatId: {
    type: String,
    required: true,
  },
  chatMessages: {
    type: Array,
    required: true,
  },
})

module.exports = mongoose.model("Chat", chatSchema)

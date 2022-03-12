const mongoose = require("mongoose")

const dogUserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model("DogUser", dogUserSchema)

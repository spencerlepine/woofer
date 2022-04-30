const mongoose = require("mongoose")

const zipcodePoolSchema = new mongoose.Schema({
  zipcodeId: {
    type: String,
    required: true,
  },
  zipcodeUsers: {
    type: Object,
    required: true,
  },
})

module.exports = mongoose.model("ZipcodePool", zipcodePoolSchema)

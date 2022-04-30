const mongoose = require("mongoose")

const dogUserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  zodiac: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  preference: {
    type: String,
    required: true,
  },
  zipcodes: {
    type: Array,
    required: true,
  },
  pictures: {
    type: Array,
    required: true,
  },
  chats: {
    type: Array,
    required: true,
  },
})

module.exports = mongoose.model("DogUser", dogUserSchema)

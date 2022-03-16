const mongoose = require("mongoose")
const { DATA_KEYS } = require("../../../config/constants")

const dogUserSchema = new mongoose.Schema({
  [DATA_KEYS["USER_ID"]]: {
    type: String,
    required: true,
  },
  [DATA_KEYS["USER_NAME"]]: {
    type: String,
    required: true,
  },
  [DATA_KEYS["USER_EMAIL"]]: {
    type: String,
    required: true,
  },
  [DATA_KEYS["USER_ZODIAC"]]: {
    type: String,
    required: true,
  },
  [DATA_KEYS["USER_GENDER"]]: {
    type: String,
    required: true,
  },
  [DATA_KEYS["USER_BREED"]]: {
    type: String,
    required: true,
  },
  [DATA_KEYS["USER_BIO"]]: {
    type: String,
    required: true,
  },
  [DATA_KEYS["USER_BIRTHYEAR"]]: {
    type: Number,
    required: true,
  },
  [DATA_KEYS["USER_PREFERENCE"]]: {
    type: String,
    required: true,
  },
  [DATA_KEYS["USER_ZIPCODES"]]: {
    type: Array,
    required: true,
  },
  [DATA_KEYS["USER_PICTURES"]]: {
    type: Array,
    required: true,
  },
  [DATA_KEYS["USER_CHATS"]]: {
    type: Array,
    required: true,
  },
})

module.exports = mongoose.model("DogUser", dogUserSchema)

// USAGE:
// schema.validate(body); // body has keys like "id" or "zipcode"
import Joi from "joi"
import * as DATA_KEYS from "./dataKeyConstants"

const schema = Joi.object({
  [DATA_KEYS["USER_ID"]]: Joi.string().alphanum().min(3).max(30),
  [DATA_KEYS["USER_NAME"]]: Joi.string(), // TODO
  [DATA_KEYS["USER_ZODIAC"]]: Joi.string(), // TODO
  [DATA_KEYS["USER_GENDER"]]: Joi.string(), // TODO
  [DATA_KEYS["USER_PREFERENCE"]]: Joi.string(), // TODO
  [DATA_KEYS["USER_BREED"]]: Joi.string(), // TODO
  [DATA_KEYS["USER_BIO"]]: Joi.string(), // TODO
  [DATA_KEYS["USER_EMAIL"]]: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  [DATA_KEYS["USER_ZIPCODES"]]: Joi.string(), // TODO an array
  [DATA_KEYS["USER_PICTURES"]]: Joi.string(), // TODO an array
  [DATA_KEYS["USER_BIRTHYEAR"]]: Joi.number().integer().min(1900).max(2013),
  [DATA_KEYS["USER_CHATS"]]: Joi.string(), // an array
  [DATA_KEYS["ZIPCODE"]]: Joi.string(), // TODO
  [DATA_KEYS["USER_PROFILE"]]: Joi.string(), // an object
  [DATA_KEYS["THIS_USER_ID"]]: Joi.string(), // TODO
  [DATA_KEYS["THAT_USER_ID"]]: Joi.string(), // TODO
  [DATA_KEYS["CHAT_ID"]]: Joi.string(), // TODO
  [DATA_KEYS["MATCH_STATUS"]]: Joi.string(), // "accept", "reject"
})

export default schema

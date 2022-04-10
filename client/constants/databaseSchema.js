// USAGE:
// schema.validate(body); // body has keys like "id" or "zipcode"
import DATA_KEYS from "./dataKeys"

const dateRegex = new RegExp(
  /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
)

const schema = (Joi) => {
  const outputObj = {
    [DATA_KEYS["USER_ID"]]: Joi.string()
      .pattern(new RegExp(/[a-z0-9]/))
      .min(3)
      .max(30),
    [DATA_KEYS["USER_NAME"]]: Joi.string().alphanum().min(3).max(15).lowercase(),
    [DATA_KEYS["USER_FIRST_NAME"]]: Joi.string()
      .pattern(new RegExp(/[a-zA-Z]/))
      .max(15),
    [DATA_KEYS["USER_LAST_NAME"]]: Joi.string()
      .pattern(new RegExp(/[a-zA-Z]/))
      .max(15),
    [DATA_KEYS["USER_ZODIAC"]]: Joi.string().valid(
      ...[
        "Aries",
        "Taurus",
        "Gemini",
        "Cancer",
        "Leo",
        "Virgo",
        "Libra",
        "Scorpio",
        "Sagittarius",
        "Capricorn",
        "Aquarius",
        "Pisces",
      ]
    ),
    [DATA_KEYS["USER_GENDER"]]: Joi.string().valid(...["Male", "Female"]),
    [DATA_KEYS["USER_GROUP"]]: Joi.string().valid(
      ...[
        "Herding",
        "Working",
        "Sporting",
        "Non-Sporting",
        "Toy",
        "Terrier",
        "Hound",
      ]
    ),
    [DATA_KEYS["USER_BREED"]]: Joi.string()
      .min(3)
      .max(15)
      .pattern(new RegExp(/[a-zA-Z]/)),
    [DATA_KEYS["USER_BIO"]]: Joi.string().min(0).max(255),
    [DATA_KEYS["USER_EMAIL"]]: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    [DATA_KEYS["USER_BIRTHDAY"]]: Joi.string().pattern(dateRegex),
    [DATA_KEYS["USER_PREFERENCE"]]: Joi.string().valid(...["Male", "Female", "Any"]),
    [DATA_KEYS["ZIPCODE"]]: Joi.string()
      .min(3)
      .max(10)
      .pattern(new RegExp(/[0-9-]/)),
    [DATA_KEYS["CHAT_ID"]]: Joi.string().alphanum(),
    [DATA_KEYS["CHAT_STARTDATE"]]: Joi.string().pattern(dateRegex),
    [DATA_KEYS["PICTURE"]]: Joi.string().uri().max(255),
    [DATA_KEYS["MATCH_STATUS"]]: Joi.string().valid(...["accept", "reject"]),
  }

  outputObj[DATA_KEYS["USER_PROFILE_PIC"]] = outputObj[DATA_KEYS["PICTURE"]]

  outputObj[DATA_KEYS["THAT_USER_ID"]] = outputObj[DATA_KEYS["USER_ID"]]
  outputObj[DATA_KEYS["THIS_USER_ID"]] = outputObj[DATA_KEYS["USER_ID"]]

  outputObj[DATA_KEYS["USER_ZIPCODES"]] = Joi.array().items(
    outputObj[DATA_KEYS["ZIPCODE"]]
  )
  outputObj[DATA_KEYS["USER_PICTURES"]] = Joi.array().items(
    outputObj[DATA_KEYS["PICTURE"]]
  )

  outputObj[DATA_KEYS["CHAT_USERS"]] = Joi.array().items(
    outputObj[DATA_KEYS["USER_ID"]]
  )

  const chatInfoObj = {
    [DATA_KEYS["CHAT_ID"]]: outputObj[DATA_KEYS["CHAT_ID"]],
    [DATA_KEYS["CHAT_USERS"]]: outputObj[DATA_KEYS["CHAT_USERS"]],
    [DATA_KEYS["CHAT_STARTDATE"]]: outputObj[DATA_KEYS["CHAT_STARTDATE"]],
  }

  outputObj[DATA_KEYS["CHAT_INFO"]] = Joi.object().keys(chatInfoObj).unknown()

  outputObj[DATA_KEYS["USER_CHATS"]] = Joi.array().items(
    outputObj[DATA_KEYS["CHAT_INFO"]]
  )

  const userProfileObj = {
    [DATA_KEYS["USER_ID"]]: outputObj[DATA_KEYS["USER_ID"]].required(),
    [DATA_KEYS["USER_NAME"]]: outputObj[DATA_KEYS["USER_NAME"]].required(),
    [DATA_KEYS["USER_FIRST_NAME"]]:
      outputObj[DATA_KEYS["USER_FIRST_NAME"]].required(),
    [DATA_KEYS["USER_LAST_NAME"]]: outputObj[DATA_KEYS["USER_LAST_NAME"]].required(),
    [DATA_KEYS["USER_PROFILE_PIC"]]:
      outputObj[DATA_KEYS["USER_PROFILE_PIC"]].required(),
    [DATA_KEYS["USER_ZODIAC"]]: outputObj[DATA_KEYS["USER_ZODIAC"]].required(),
    [DATA_KEYS["USER_GENDER"]]: outputObj[DATA_KEYS["USER_GENDER"]].required(),
    [DATA_KEYS["USER_BREED"]]: outputObj[DATA_KEYS["USER_BREED"]].required(),
    [DATA_KEYS["USER_BIO"]]: outputObj[DATA_KEYS["USER_BIO"]].required(),
    [DATA_KEYS["USER_BIRTHDAY"]]: outputObj[DATA_KEYS["USER_BIRTHDAY"]].required(),
    [DATA_KEYS["USER_PREFERENCE"]]: outputObj[DATA_KEYS["USER_PREFERENCE"]],
    [DATA_KEYS["USER_ZIPCODES"]]: outputObj[DATA_KEYS["USER_ZIPCODES"]],
    [DATA_KEYS["USER_PICTURES"]]: outputObj[DATA_KEYS["USER_PICTURES"]],
    [DATA_KEYS["USER_CHATS"]]: outputObj[DATA_KEYS["USER_CHATS"]],
  }

  outputObj[DATA_KEYS["USER_PROFILE"]] = Joi.object().keys(userProfileObj).unknown()

  return Joi.object(outputObj)
}

export default schema

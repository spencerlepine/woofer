const DATA_KEYS = require('./dataKeys');

const BODY_KEYS = "expectedBodyKeys"
const OPT_KEYS = "optionalBodyKeys"
const PARAM_KEYS = "expectedParamKeys"
const RESPONSE_KEYS = "responseExpectedKeys"
const baseURL = '/api'

const ENDPOINT_ROUTES = {
  // "EXAMPLE": {
  //   "URL": "example",
  //   "POST": {
  //     [BODY_KEYS]: [DATA_KEYS["USER_ID"], DATA_KEYS["USER_EMAILS"]],
  //     [OPT_KEYS]: [DATA_KEYS["USER_NAME"]],
  //   },
  //   "GET": {
  //     [PARAM_KEYS]: [DATA_KEYS["USER_ID"]],
  //     [RESPONSE_KEYS]: [
  //         [DATA_KEYS["USER_PROFILE"]],
  //     ]
  //   }
  // },
  SIGNUP: {
    URL: "signup",
    POST: {
      [BODY_KEYS]: [DATA_KEYS["USER_ID"], DATA_KEYS["USER_EMAIL"]],
    },
  },
  ZIPCODES: {
    URL: "zipcodes",
    ADD: {
      URL: "add",
      POST: {
        [BODY_KEYS]: [DATA_KEYS["USER_ID"], DATA_KEYS["ZIPCODE"]],
        [RESPONSE_KEYS]: [DATA_KEYS["USER_PROFILE"]],
      },
    },
    REMOVE: {
      URL: "remove",
      DELETE: {
        [BODY_KEYS]: [DATA_KEYS["USER_ID"], DATA_KEYS["ZIPCODE"]],
        [RESPONSE_KEYS]: [DATA_KEYS["USER_PROFILE"]],
      },
    },
    ALL: {
      URL: "all",
      GET: {
        [BODY_KEYS]: [DATA_KEYS["ZIPCODE"]],
        [RESPONSE_KEYS]: [DATA_KEYS["USER_ZIPCODES"]],
      },
    },
  },
  MATCHES: {
    URL: "matches",
    GENERATE: {
      URL: "generate",
      GET: {
        [PARAM_KEYS]: [DATA_KEYS["USER_ID"]],
        [RESPONSE_KEYS]: [DATA_KEYS["USER_PROFILE"]],
      },
    },
    SWIPE: {
      URL: "swipe",
      POST: {
        [BODY_KEYS]: [
          DATA_KEYS["THIS_USER_ID"],
          DATA_KEYS["THAT_USER_ID"],
          DATA_KEYS["MATCH_STATUS"],
        ],
        [RESPONSE_KEYS]: [DATA_KEYS["CHAT_ID"], DATA_KEYS["USER_PROFILE"]],
      },
    },
  },
  PROFILE: {
    URL: "profile",
    GET: {
      [PARAM_KEYS]: [DATA_KEYS["USER_ID"]],
      [RESPONSE_KEYS]: [DATA_KEYS["USER_PROFILE"]],
    },
    DETAILS: {
      URL: "details",
      GET: {
        [PARAM_KEYS]: [DATA_KEYS["USER_ID"]],
        [RESPONSE_KEYS]: [DATA_KEYS["USER_PROFILE"]],
      },
      POST: {
        [BODY_KEYS]: [DATA_KEYS["USER_ID"]],
        [OPT_KEYS]: [
          [DATA_KEYS["USER_NAME"]],
          [DATA_KEYS["USER_GENDER"]],
          [DATA_KEYS["USER_ZODIAC"]],
          [DATA_KEYS["USER_PREFERENCE"]],
          [DATA_KEYS["USER_BREED"]],
          [DATA_KEYS["USER_BIO"]],
          [DATA_KEYS["USER_EMAIL"]],
          [DATA_KEYS["USER_PICTURES"]],
          [DATA_KEYS["USER_BIRTHYEAR"]],
          [DATA_KEYS["USER_ZIPCODES"]]
        ],
        [RESPONSE_KEYS]: [DATA_KEYS["USER_PROFILE"]],
      },
      DELETE: {
        [BODY_KEYS]: [DATA_KEYS["USER_ID"]],
      },
    },
  },
}


// Chat endpoints?
/*
READ /chats/:userId => Read all chats for a given user
POST /chats/messages/:chatId=> POST Body with new message
POST /chats/create => Create a chat with DogA -> DogB save to profiles, return ID
READ /chats/messages/:chatId => GET Last messages in the chat
DELETE /chats/delete/:chatId => Delete access to chat "Block User", just remove chat Ids from chat lists under profiles. Still "in" database
*/

const endpointURLStr = (urlRoutes, reqMethod) => {
  try {
    let lastObject = ENDPOINT_ROUTES
    let urls = [baseURL]
    urlRoutes.forEach((str) => {
      urls.push(lastObject[str]["URL"])
      lastObject = lastObject[str]
    })
    return urls.join("/")
  } catch (err) {
    throw new Error(`Endpoint URL does not exist =>, ${urlRoutes}, ${reqMethod}`)
  }
}

const expectedRequest = (urlRoutes, reqMethod) => {
  let lastObject = ENDPOINT_ROUTES
  try {
    urlRoutes.forEach((str) => {
      lastObject = lastObject[str]
    })
    if (lastObject[reqMethod]) {
      return lastObject[reqMethod]
    }
    throw new Error()
  } catch (err) {

    throw new Error(`Endpoint URL or method does not exist => ${reqMethod}, ${urlRoutes} => ${err}`)
  }
}


module.exports.default = ENDPOINT_ROUTES;
module.exports.BODY_KEYS = "expectedBodyKeys"
module.exports.OPT_KEYS = "optionalBodyKeys"
module.exports.PARAM_KEYS = "expectedParamKeys"
module.exports.RESPONSE_KEYS = "responseExpectedKeys"
module.exports.expectedRequest = expectedRequest
module.exports.endpointURLStr = endpointURLStr
module.exports.baseURL = baseURL;
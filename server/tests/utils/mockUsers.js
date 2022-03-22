const request = require("supertest")

const app = require("../../src/app")
const { endpointURLStr } = require("../../config/constants")

module.exports = (DATA_KEYS) => ({
  mockUser: {
    [DATA_KEYS["USER_ID"]]: "1234asdfuasdf",
    [DATA_KEYS["USER_EMAIL"]]: "johndoe@gmail.com",
    [DATA_KEYS["USER_NAME"]]: "john124412",
    [DATA_KEYS["USER_ZODIAC"]]: "Virgo",
    [DATA_KEYS["USER_GENDER"]]: "Male",
    [DATA_KEYS["USER_BREED"]]: "Shiba",
    [DATA_KEYS["USER_BIO"]]: "Example description",
    [DATA_KEYS["USER_BIRTHYEAR"]]: 2002,
    [DATA_KEYS["USER_PREFERENCE"]]: "Female",
    [DATA_KEYS["USER_ZIPCODES"]]: [],
    [DATA_KEYS["USER_PICTURES"]]: [],
    [DATA_KEYS["USER_CHATS"]]: [],
  },
  mockUserB: {
    [DATA_KEYS["USER_ID"]]: "jd82ndkv14",
    [DATA_KEYS["USER_EMAIL"]]: "pippapaw@gmail.com",
    [DATA_KEYS["USER_NAME"]]: "pippa124412",
    [DATA_KEYS["USER_ZODIAC"]]: "Cancer",
    [DATA_KEYS["USER_GENDER"]]: "Female",
    [DATA_KEYS["USER_BREED"]]: "Shiba",
    [DATA_KEYS["USER_BIO"]]: "Example description",
    [DATA_KEYS["USER_BIRTHYEAR"]]: 2001,
    [DATA_KEYS["USER_PREFERENCE"]]: "Male",
    [DATA_KEYS["USER_ZIPCODES"]]: [],
    [DATA_KEYS["USER_PICTURES"]]: [],
    [DATA_KEYS["USER_CHATS"]]: [],
  },
  signupMockUser: (user, done) => {
    const method = "POST"
    const endpointPaths = ["SIGNUP"]
    const endpointObj = { endpointPathKeys: endpointPaths, method }
    const url = endpointURLStr(endpointPaths, method)

    return new Promise((resolve, reject) => {
      request(app)
        .post(url)
        .send(user)
        .end((err, res) => {
          resolve()
          if (err) reject(err)
        })
    })
  },
})
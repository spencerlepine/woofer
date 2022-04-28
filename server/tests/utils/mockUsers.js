const request = require("supertest")

const app = require("../../src/app")
const { endpointURLStr } = require("../../config/constants")

module.exports = (DATA_KEYS) => ({
  mockUser: {
    [DATA_KEYS["USER_ID"]]: "1234asdfuasdf",
    [DATA_KEYS["USER_EMAIL"]]: "johndoe@gmail.com",
    [DATA_KEYS["USER_NAME"]]: "john124412",
    [DATA_KEYS["USER_FIRST_NAME"]]: "John",
    [DATA_KEYS["USER_LAST_NAME"]]: "Doe",
    [DATA_KEYS["USER_PROFILE_PIC"]]:
      "https://www.bing.com/th?id=OIP.EQq_JNDqxUVzS4aszkfoDAHaHa&w=150&h=160&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    [DATA_KEYS["USER_ZODIAC"]]: "Virgo",
    [DATA_KEYS["USER_GENDER"]]: "Male",
    [DATA_KEYS["USER_BREED"]]: "Shiba",
    [DATA_KEYS["USER_BIO"]]: "Example description",
    [DATA_KEYS["USER_BIRTHDAY"]]: "06/12/2001",
    [DATA_KEYS["USER_PREFERENCE"]]: "Female",
    [DATA_KEYS["USER_ZIPCODES"]]: [],
    [DATA_KEYS["USER_PICTURES"]]: [],
    [DATA_KEYS["USER_CHATS"]]: [],
  },
  mockUserB: {
    [DATA_KEYS["USER_ID"]]: "jd82ndkv14",
    [DATA_KEYS["USER_EMAIL"]]: "pippapaw@gmail.com",
    [DATA_KEYS["USER_NAME"]]: "pippa124412",
    [DATA_KEYS["USER_FIRST_NAME"]]: "John",
    [DATA_KEYS["USER_LAST_NAME"]]: "Doe",
    [DATA_KEYS["USER_PROFILE_PIC"]]:
      "https://www.bing.com/th?id=OIP.EQq_JNDqxUVzS4aszkfoDAHaHa&w=150&h=160&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    [DATA_KEYS["USER_ZODIAC"]]: "Cancer",
    [DATA_KEYS["USER_GENDER"]]: "Female",
    [DATA_KEYS["USER_BREED"]]: "Shiba",
    [DATA_KEYS["USER_BIO"]]: "Example description",
    [DATA_KEYS["USER_BIRTHDAY"]]: "06/12/2001",
    [DATA_KEYS["USER_PREFERENCE"]]: "Male",
    [DATA_KEYS["USER_ZIPCODES"]]: [],
    [DATA_KEYS["USER_PICTURES"]]: [],
    [DATA_KEYS["USER_CHATS"]]: [],
  },
  swipeOnUser: (thisUser, thatUser, swipeChoice) => {
    const idKey = DATA_KEYS["USER_ID"]
    const thisUserId = thisUser[idKey]
    const thatUserId = thatUser[idKey]
    const url = endpointURLStr(["MATCHES", "SWIPE"], "POST")

    const body = {
      [DATA_KEYS["THIS_USER_ID"]]: thisUserId,
      [DATA_KEYS["THAT_USER_ID"]]: thatUserId,
      [DATA_KEYS["MATCH_STATUS"]]: swipeChoice,
    }

    return request(app).post(url).send(body)
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
  addUserToZip: (userId, zipcode, done) => {
    const method = "POST"
    const endpointPaths = ["ZIPCODES", "ADD"]
    const endpointObj = { endpointPathKeys: endpointPaths, method }
    const url = endpointURLStr(endpointPaths, method)

    const body = {
      [DATA_KEYS["USER_ID"]]: userId,
      [DATA_KEYS["ZIPCODE"]]: zipcode,
    }

    return new Promise((resolve, reject) => {
      request(app)
        .post(url)
        .send(body)
        .end((err, res) => {
          resolve()
          if (err) reject(err)
        })
    })
  },
})

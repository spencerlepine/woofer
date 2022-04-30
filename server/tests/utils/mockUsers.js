const request = require("supertest")

const app = require("../../src/app")
const { endpointURLStr } = require("../../config/constants")

module.exports = (DATA_KEYS) => ({
  mockUser: {
    userId: "1234asdfuasdf",
    email: "johndoe@gmail.com",
    username: "john124412",
    firstName: "John",
    lastName: "Doe",
    profilePicture:
      "https://www.bing.com/th?id=OIP.EQq_JNDqxUVzS4aszkfoDAHaHa&w=150&h=160&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    zodiac: "Virgo",
    gender: "Male",
    breed: "Shiba",
    bio: "Example description",
    birthday: "06/12/2001",
    preference: "Female",
    zipcodes: [],
    pictures: [],
    chats: [],
  },
  mockUserB: {
    userId: "jd82ndkv14",
    email: "pippapaw@gmail.com",
    username: "pippa124412",
    firstName: "John",
    lastName: "Doe",
    profilePicture:
      "https://www.bing.com/th?id=OIP.EQq_JNDqxUVzS4aszkfoDAHaHa&w=150&h=160&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
    zodiac: "Cancer",
    gender: "Female",
    breed: "Shiba",
    bio: "Example description",
    birthday: "06/12/2001",
    preference: "Male",
    zipcodes: [],
    pictures: [],
    chats: [],
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

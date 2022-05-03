const request = require("supertest")

const app = require("../../src/app")

module.exports = {
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
    const idKey = "userId"
    const thisUserId = thisUser[idKey]
    const thatUserId = thatUser[idKey]
    const url = "/api/matches/status"

    const body = {
      thisUserId: thisUserId,
      thatUserId: thatUserId,
      matchStatus: swipeChoice,
    }

    return request(app).post(url).send(body)
  },
  signupMockUser: (user, userId = "1234asdfuasdf") => {
    const method = "POST"
    const url = "/api/signup"

    const body = {
      userId: userId,
      ...user,
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
  addUserToZip: (userId, zipcode, done) => {
    const method = "POST"
    const url = "/api/zipcodes/add"

    const body = {
      userId: userId,
      zipcode: zipcode,
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
}

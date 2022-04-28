const request = require("supertest")

const {
  app,
  constants: { endpointURLStr, DATA_KEYS },
  mockUser,
  mockUserB,
  signupMockUser,
  swipeOnUser,
} = require("../utils/test-helpers")

const fetchMatchStatus = (thisUser, thatUser) => {
  const thisUserId = thisUser[DATA_KEYS["USER_ID"]]
  const thatUserId = thatUser[DATA_KEYS["USER_ID"]]
  const url = endpointURLStr(["MATCHES", "STATUS"], "GET")

  const query = {
    [DATA_KEYS["THIS_USER_ID"]]: thisUserId,
    [DATA_KEYS["THAT_USER_ID"]]: thatUserId,
  }

  return request(app).get(url).query(query)
}

describe("MATCHES Swipe Choice endpoint", () => {
  const idKey = DATA_KEYS["USER_ID"]
  const thisUserId = mockUser[idKey]
  const thatUserId = mockUserB[idKey]

  const ACCEPT = DATA_KEYS["MATCH_ACCEPT"]
  const REJECT = DATA_KEYS["MATCH_REJECT"]

  const signupMockUsers = () =>
    Promise.all([signupMockUser(mockUser), signupMockUser(mockUserB)])

  describe("should save first time user swipe accept", () => {
    test("POST a ACCEPT Swipe", (done) => {
      signupMockUsers()
        .then(() => {
          swipeOnUser(mockUser, mockUserB, ACCEPT)
            .expect("Content-Type", /json/)
            .expect(201)
            .expect((result) => {
              expect(result).toBeDefined()
              const resBody = result.body
              expect([DATA_KEYS["USER_PROFILE"]] in resBody).toBeTruthy()
              expect(resBody[DATA_KEYS["CHAT_ID"]]).toBe("none")
            })
            .end((err, res) => {
              if (err) return done(err.stack)
              return done()
            })
        })
        .then(() => {
          // Verify the match status is in the database
          fetchMatchStatus(mockUser, mockUserB)
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((result) => {
              expect(result).toBeDefined()
              const matchStatusObj = result.body

              expect(matchStatusObj).toHaveProperty(thisUserId, ACCEPT)
              expect(matchStatusObj).toHaveProperty(thatUserId, "none")
            })
        })
        .catch(done)
        .then(done)
    })
  })

  describe("should save user swipe rejection", () => {
    test("POST a REJECTION Swipe", (done) => {
      signupMockUsers()
        .then(() => {
          // ACT => Swipe NO on the User
          swipeOnUser(mockUser, mockUserB, REJECT)
            .expect("Content-Type", /json/)
            .expect(201)
            .expect((result) => {
              expect(result).toBeDefined()
              const resBody = result.body
              expect([DATA_KEYS["USER_PROFILE"]] in resBody).toBeTruthy()
              expect(resBody[DATA_KEYS["CHAT_ID"]]).toBe("none")
            })
        })
        .then(() => {
          // Verify the match status is in the database
          fetchMatchStatus(mockUser, mockUserB)
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((result) => {
              expect(result).toBeDefined()
              const matchStatusObj = result.body

              expect(matchStatusObj).toHaveProperty(thisUserId, REJECT)
              expect(matchStatusObj).toHaveProperty(thatUserId, "none")
            })
        })
        .catch(done)
        .then(done)
    })
  })

  describe("should save a mutual ACCEPT swipe", () => {
    const swipeYesA = () => swipeOnUser(mockUser, mockUserB, ACCEPT)
    const swipeYesB = () => swipeOnUser(mockUserB, mockUser, ACCEPT)

    test("POST a mutual ACCEPT Swipe", (done) => {
      signupMockUsers()
        .then(() => swipeYesA())
        .then(() => {
          swipeYesB()
            .expect("Content-Type", /json/)
            .expect(201)
            .expect((result) => {
              expect(result).toBeDefined()
              const resBody = result.body
              expect([DATA_KEYS["USER_PROFILE"]] in resBody).toBeTruthy()
              expect(resBody[DATA_KEYS["CHAT_ID"]]).not.toBe("none")

              expect([DATA_KEYS["USER_PROFILE"]]).toHaveProperty(thisUserID)
            })
            .end((err, res) => {
              if (err) return done(err.stack)
              return done()
            })
        })
        .then(() => {
          // Verify the match status is in the database
          fetchMatchStatus(mockUser, mockUserB)
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((result) => {
              expect(result).toBeDefined()
              const matchStatusObj = result.body

              expect(matchStatusObj).toHaveProperty(thisUserId, ACCEPT)
              expect(matchStatusObj).toHaveProperty(thatUserId, ACCEPT)
            })
        })
        .catch(done)
        .then(done)
    })
  })
})

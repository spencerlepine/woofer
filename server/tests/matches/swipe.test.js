const request = require("supertest")

const { app, mockUser, mockUserB, signupMockUser } = global.testHelpers

const swipeOnUser = (thisUserId, thatUserId, matchStatus) => {
  const url = "/api/matches/swipe"

  const body = {
    thisUserId,
    thatUserId,
    matchStatus,
  }

  return request(app).post(url).send(body)
}

// const swipeOnUser = require("../../src/controllers/matches/updateSwipeRecord")

const fetchMatchStatus = (thisUser, thatUser) => {
  const thisUserId = thisUser["userId"]
  const thatUserId = thatUser["userId"]
  const url = "/api/matches/status"

  const query = {
    thisUserId: thisUserId,
    thatUserId: thatUserId,
  }

  return request(app).get(url).query(query)
}

describe("MATCHES Swipe Choice endpoint", () => {
  const idKey = "userId"
  const thisUserId = mockUser[idKey]
  const thatUserId = mockUserB[idKey]

  const ACCEPT = "accept"
  const REJECT = "reject"

  describe("should save first time user swipe accept", () => {
    test("POST a ACCEPT Swipe", (done) => {
      signupMockUser(mockUser)
        .then(() => signupMockUser(mockUserB))
        .then(() => swipeOnUser(mockUser["userId"], mockUserB["userId"], ACCEPT))
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
            .end((err, res) => {
              if (err) return done(err)
              return done()
            })
        })
        .catch(done)
    })
  })

  describe("should save user swipe rejection", () => {
    test("POST a REJECTION Swipe", (done) => {
      signupMockUser(mockUser)
        .then(() => signupMockUser(mockUserB))
        .then(() => swipeOnUser(mockUser["userId"], mockUserB["userId"], REJECT))
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
            .end((err, res) => {
              if (err) return done(err)
              return done()
            })
        })
        .catch(done)
    })
  })

  describe("should save a mutual ACCEPT swipe", () => {
    const swipeYesA = () => swipeOnUser(mockUser, mockUserB, ACCEPT)
    const swipeYesB = () => swipeOnUser(mockUserB, mockUser, ACCEPT)

    test("POST a mutual ACCEPT Swipe", (done) => {
      signupMockUser(mockUser)
        .then(() => signupMockUser(mockUserB))
        .then(() => swipeOnUser(mockUser["userId"], mockUserB["userId"], ACCEPT))
        .then(() => swipeOnUser(mockUserB["userId"], mockUser["userId"], ACCEPT))
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
            .end((err, res) => {
              if (err) return done(err)
              return done()
            })
        })
        .catch(done)
    })
  })
})

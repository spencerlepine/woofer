const request = require("supertest")

const { app, mockUser, mockUserB, signupMockUser } = require("../utils/test-helpers")

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
  const url = "api/matches/status"

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
        .then(() => {
          swipeOnUser(mockUser["userId"], mockUserB["userId"], ACCEPT)
            .expect("Content-Type", /json/)
            .expect(201)
            .expect((result) => {
              expect(result).toBeDefined()
              const resBody = result.body
              expect("userProfile" in resBody).toBeTruthy()
              expect(resBody["chatId"]).toBe("none")
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
      signupMockUser(mockUser)
        .then(() => signupMockUser(mockUserB))
        .then(() => {
          // ACT => Swipe NO on the User
          swipeOnUser(mockUser, mockUserB, REJECT)
            .expect("Content-Type", /json/)
            .expect(201)
            .expect((result) => {
              expect(result).toBeDefined()
              const resBody = result.body
              expect("userProfile" in resBody).toBeTruthy()
              expect(resBody["chatId"]).toBe("none")
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
      signupMockUser(mockUser)
        .then(() => signupMockUser(mockUserB))
        .then(() => swipeYesA())
        .then(() => {
          swipeYesB()
            .expect("Content-Type", /json/)
            .expect(201)
            .expect((result) => {
              expect(result).toBeDefined()
              const resBody = result.body
              expect("userProfile" in resBody).toBeTruthy()
              expect(resBody["chatId"]).not.toBe("none")
              expect("userProfile").toHaveProperty(thisUserID)
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

const request = require("supertest")

const { app, mockUser, mockUserB, signupMockUser } = require("../utils/test-helpers")

const swipeOnUser = require("../../src/controllers/matches/updateSwipeRecord")

const fetchMatchQueue = (thisUser) => {
  const userId = thisUser["userId"]
  const url = "/api/matches/queue"

  const query = {
    ["userId"]: userId,
  }

  return request(app).get(url).query(query)
}

describe("MATCHES endpoint Match Queue", () => {
  const idKey = "userId"
  const thisUserId = mockUser[idKey]
  const thatUserId = mockUserB[idKey]

  const ACCEPT = "accept"
  const REJECT = "reject"

  const signupMockUsers = () =>
    Promise.all([signupMockUser(mockUser), signupMockUser(mockUserB)])

  describe("initial YES swipe adds thisUser to thatUsers match queue", () => {
    test("should find userIds are in Match Queue", (done) => {
      signupMockUsers()
        .then(() => swipeOnUser(mockUser["userId"], mockUserB["userId"], ACCEPT))
        .then(() => {
          fetchMatchQueue(mockUserB)
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((result) => {
              expect(result).toBeDefined()
              const resBody = result.body

              expect(resBody).toHaveProperty("matchQueue")
              const { matchQueue: queueArr } = resBody
              expect(Array.isArray(queueArr)).toBeTruthy()
              expect(queue.includes(thisUserId)).toBeTruthy()
            })
        })
        .catch(done)
        .then(done)
    })
  })

  describe("NO swipe removes users from match queue", () => {
    test("should not find userIds in Match Queue", (done) => {
      signupMockUsers()
        .then(() => swipeOnUser(mockUser["userId"], mockUserB["userId"], ACCEPT))
        .then(() => swipeOnUser(mockUserB["userId"], mockUser["userId"], REJECT))
        .then(() => {
          const [queueToCheck, otherUserId] = [mockUser, thatUserId]

          fetchMatchQueue(queueToCheck)
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((result) => {
              expect(result).toBeDefined()
              const resBody = result.body

              expect(resBody).toHaveProperty("matchQueue")
              const { matchQueue: queueArr } = resBody
              expect(Array.isArray(queueArr)).toBeTruthy()
              expect(queue.includes(otherUserId)).not.toBeTruthy()
            })
        })
        .then(() => {
          const [queueToCheck, otherUserId] = [mockUserB, thisUserId]

          fetchMatchQueue(queueToCheck)
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((result) => {
              expect(result).toBeDefined()
              const resBody = result.body

              expect(resBody).toHaveProperty("matchQueue")
              const { matchQueue: queueArr } = resBody
              expect(Array.isArray(queueArr)).toBeTruthy()
              expect(queue.includes(otherUserId)).not.toBeTruthy()
            })
        })
        .catch(done)
        .then(done)
    })
  })

  describe("mutual YES swipe removes both users from match queue", () => {
    test("should not find userIds in Match Queue", (done) => {
      signupMockUsers()
        .then(() => swipeOnUser(mockUser["userId"], mockUserB["userId"], ACCEPT))
        .then(() => swipeOnUser(mockUserB["userId"], mockUser["userId"], ACCEPT))
        .then(() => {
          const [queueToCheck, otherUserId] = [mockUser, thatUserId]

          fetchMatchQueue(queueToCheck)
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((result) => {
              expect(result).toBeDefined()
              const resBody = result.body

              expect(resBody).toHaveProperty("matchQueue")
              const { matchQueue: queueArr } = resBody
              expect(Array.isArray(queueArr)).toBeTruthy()
              expect(queue.includes(otherUserId)).not.toBeTruthy()
            })
        })
        .then(() => {
          const [queueToCheck, otherUserId] = [mockUserB, thisUserId]

          fetchMatchQueue(queueToCheck)
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((result) => {
              expect(result).toBeDefined()
              const resBody = result.body

              expect(resBody).toHaveProperty("matchQueue")
              const { matchQueue: queueArr } = resBody
              expect(Array.isArray(queueArr)).toBeTruthy()
              expect(queue.includes(otherUserId)).not.toBeTruthy()
            })
        })
        .catch(done)
        .then(done)
    })
  })
})

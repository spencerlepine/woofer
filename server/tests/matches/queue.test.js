const request = require("supertest")

const {
  app,
  constants: { endpointURLStr, DATA_KEYS },
  mockUser,
  mockUserB,
  signupMockUser,
  swipeOnUser,
} = require("../utils/test-helpers")

const fetchMatchQueue = (thisUser) => {
  const userId = thisUser[DATA_KEYS["USER_ID"]]
  const url = endpointURLStr(["MATCHES", "QUEUE"], "GET")

  const query = {
    [DATA_KEYS["USER_ID"]]: userId,
  }

  return request(app).get(url).query(query)
}

describe("MATCHES endpoint Match Queue", () => {
  const idKey = DATA_KEYS["USER_ID"]
  const thisUserId = mockUser[idKey]
  const thatUserId = mockUserB[idKey]

  const ACCEPT = DATA_KEYS["MATCH_ACCEPT"]
  const REJECT = DATA_KEYS["MATCH_REJECT"]

  const signupMockUsers = () =>
    Promise.all([signupMockUser(mockUser), signupMockUser(mockUserB)])

  describe("initial YES swipe adds thisUser to thatUsers match queue", () => {
    test("should find userIds are in Match Queue", (done) => {
      signupMockUsers()
        .then(() => swipeOnUser(mockUser, mockUserB, ACCEPT))
        .then(() => {
          fetchMatchQueue(mockUserB)
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((result) => {
              expect(result).toBeDefined()
              const resBody = result.body

              expect(resBody).toHaveProperty(DATA_KEYS["USER_QUEUE"])
              const { [DATA_KEYS["USER_QUEUE"]]: queueArr } = resBody
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
        .then(() => swipeOnUser(mockUser, mockUserB, ACCEPT))
        .then(() => swipeOnUser(mockUserB, mockUser, REJECT))
        .then(() => {
          const [queueToCheck, otherUserId] = [mockUser, thatUserId]

          fetchMatchQueue(queueToCheck)
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((result) => {
              expect(result).toBeDefined()
              const resBody = result.body

              expect(resBody).toHaveProperty(DATA_KEYS["USER_QUEUE"])
              const { [DATA_KEYS["USER_QUEUE"]]: queueArr } = resBody
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

              expect(resBody).toHaveProperty(DATA_KEYS["USER_QUEUE"])
              const { [DATA_KEYS["USER_QUEUE"]]: queueArr } = resBody
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
        .then(() => swipeOnUser(mockUser, mockUserB, ACCEPT))
        .then(() => swipeOnUser(mockUserB, mockUser, ACCEPT))
        .then(() => {
          const [queueToCheck, otherUserId] = [mockUser, thatUserId]

          fetchMatchQueue(queueToCheck)
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((result) => {
              expect(result).toBeDefined()
              const resBody = result.body

              expect(resBody).toHaveProperty(DATA_KEYS["USER_QUEUE"])
              const { [DATA_KEYS["USER_QUEUE"]]: queueArr } = resBody
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

              expect(resBody).toHaveProperty(DATA_KEYS["USER_QUEUE"])
              const { [DATA_KEYS["USER_QUEUE"]]: queueArr } = resBody
              expect(Array.isArray(queueArr)).toBeTruthy()
              expect(queue.includes(otherUserId)).not.toBeTruthy()
            })
        })
        .catch(done)
        .then(done)
    })
  })
})

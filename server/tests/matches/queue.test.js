const request = require("supertest")

const { app, mockUser, mockUserB, signupMockUser } = global.testHelpers

// const swipeOnUser = require("../../src/controllers/matches/updateSwipeRecord")
const swipeOnUser = (thisUserId, thatUserId, matchStatus) => {
  const body = {
    thisUserId,
    thatUserId,
    matchStatus,
  }

  const url = "/api/matches/swipe"

  return request(app).post(url).send(body)
}

const { getModelDocumentById } = require("../../src/models/modelHelpers")

const fetchMatchQueue = (thisUser) => {
  const userId = thisUser["userId"]

  return getModelDocumentById("MatchQueue", "userId", userId)
    .then((matchRecord) => {
      if (matchRecord && matchRecord["matchQueue"]) {
        return matchRecord
      } else {
        return {
          matchQueue: [],
        }
      }
    })
    .catch((err) => {
      console.error(err)
      return {
        matchQueue: [],
      }
    })
}

describe("MATCHES endpoint Match Queue", () => {
  const idKey = "userId"
  const thisUserId = mockUser[idKey]
  const thatUserId = mockUserB[idKey]

  const ACCEPT = "accept"
  const REJECT = "reject"

  describe("initial YES swipe adds thisUser to thatUsers match queue", () => {
    test("should find userIds are in Match Queue", (done) => {
      signupMockUser(mockUser)
        .then(() => signupMockUser(mockUserB))
        .then(() => swipeOnUser(mockUser["userId"], mockUserB["userId"], ACCEPT))
        .then(() => fetchMatchQueue(mockUserB))
        .then((result) => {
          expect(result).toBeDefined()
          expect(result).toHaveProperty("matchQueue")
          const { matchQueue: queueArr } = result
          expect(Array.isArray(queueArr)).toBeTruthy()
          expect(queueArr.includes(thisUserId)).toBeTruthy()
          done()
        })
        .catch(done)
    })
  })

  describe("NO swipe removes users from match queue", () => {
    test("should not find userIds in Match Queue", (done) => {
      signupMockUser(mockUser)
        .then(() => signupMockUser(mockUserB))
        .then(() => swipeOnUser(mockUser["userId"], mockUserB["userId"], ACCEPT))
        .then(() => swipeOnUser(mockUserB["userId"], mockUser["userId"], REJECT))
        .then(() => fetchMatchQueue(mockUser))
        .then((result) => {
          expect(result).toBeDefined()
          expect(result).toHaveProperty("matchQueue")
          const { matchQueue: queueArr } = result
          expect(Array.isArray(queueArr)).toBeTruthy()
          expect(queueArr.includes(thatUserId)).toBe(false)
        })
        .then(() => fetchMatchQueue(mockUserB))
        .then((result) => {
          expect(result).toBeDefined()
          expect(result).toHaveProperty("matchQueue")
          const { matchQueue: queueArr } = result
          expect(Array.isArray(queueArr)).toBeTruthy()
          expect(queueArr.includes(thisUserId)).toBe(false)
          done()
        })
        .catch((err) => {
          console.log(err)
          done(err)
        })
    })
  })

  describe("mutual YES swipe removes both users from match queue", () => {
    test("should not find userIds in Match Queue", (done) => {
      signupMockUser(mockUser)
        .then(() => signupMockUser(mockUserB))
        .then(() => swipeOnUser(mockUser["userId"], mockUserB["userId"], ACCEPT))
        .then(() => swipeOnUser(mockUserB["userId"], mockUser["userId"], ACCEPT))
        .then(() => fetchMatchQueue(mockUser))
        .then((result) => {
          expect(result).toBeDefined()
          expect(result).toHaveProperty("matchQueue")
          const { matchQueue: queueArr } = result
          expect(Array.isArray(queueArr)).toBeTruthy()
          expect(queueArr.includes(thatUserId)).not.toBeTruthy()
        })
        .then(() => fetchMatchQueue(mockUserB))
        .then((result) => {
          expect(result).toBeDefined()
          expect(result).toHaveProperty("matchQueue")
          const { matchQueue: queueArr } = result
          expect(Array.isArray(queueArr)).toBeTruthy()
          expect(queueArr.includes(thisUserId)).not.toBeTruthy()
          done()
        })
        .catch(done)
    })
  })
})

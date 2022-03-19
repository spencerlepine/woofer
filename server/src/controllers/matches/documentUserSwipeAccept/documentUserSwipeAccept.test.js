const request = require("supertest")
const documentUserSwipeAccept = require("./index")
const fetchMatchRecord = require("../../controllerHelpers/matches/fetchMatchRecord")

const {
  constants: { DATA_KEYS, endpointURLStr },
  mockUser,
  mockUserB,
  signupMockUser,
  app,
} = global.testHelpers

const idKey = DATA_KEYS["USER_ID"]
const thisUserId = mockUser[idKey]
const thatUserId = mockUserB[idKey]

describe("documentUserSwipeAccept helper", () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    setHeader: jest.fn(),
    end: jest.fn((r) => r),
  }
  const endpointObj = {
    endpointPathKeys: ["MATCHES", "SWIPE"],
    method: "POST",
  }
  const url = endpointURLStr(["MATCHES", "SWIPE"], "POST")

  test("should return a promise", () => {
    const query = { idKey: thisUserId }

    const result = documentUserSwipeAccept(res, endpointObj, thisUserId, thatUserId)
    expect(result.constructor).toBe(Promise)
  })

  test("should throw an error with missing arguments", (done) => {
    documentUserSwipeAccept()
      .then(() => { })
      .catch((err) => err)
      .then((possibleErr) => {
        expect(possibleErr).toBeTruthy()
        done()
      })
  })

  test("should fail given invalid arguments", (done) => {
    documentUserSwipeAccept({}, endpointObj, thisUserId, thatUserId)
      .then(() => { })
      .catch((err) => err)
      .then((possibleErr) => {
        expect(possibleErr).toBeTruthy()
        done()
      })
  })

  test("should resolve given valid arguments", (done) => {
    signupMockUser(mockUser)
      .then(() => documentUserSwipeAccept(res, endpointObj, thisUserId, thatUserId))
      .then(() => { })
      .catch((err) => err)
      .then((possibleErr) => {
        expect(possibleErr).not.toBeTruthy()
        done()
      })
  })

  describe("Updating the match records", () => {
    const body = {
      [DATA_KEYS["THIS_USER_ID"]]: thisUserId,
      [DATA_KEYS["THAT_USER_ID"]]: thatUserId,
      [DATA_KEYS["MATCH_STATUS"]]: DATA_KEYS["MATCH_ACCEPT"],
    }

    test("Should return a response body with chatId and user info", (done) => {
      // POST the match rejection
      signupMockUser(mockUser)
        .then(() => (
          request(app)
            .post(url)
            .send(body)
        ))
        .then((response) => {
          // ASSERT the response
          expect(response).toBeDefined()
          expect(typeof response).toBe("object")
          expect(response[DATA_KEYS["CHAT_ID"]]).not.toBeTruthy()
          expect(response[DATA_KEYS["USER_PROFILE"]]).not.toBeTruthy()
          done()
        })
    })

    test("Should save the rejection in user match records", (done) => {
      // POST the match rejection
      signupMockUser(mockUser)
        .then(() => (
          request(app)
            .post(url)
            .send(body)
        ))
        .then(() => fetchMatchRecord(res, { [DATA_KEYS["USER_MATCHES"]]: thisUserId }))
        .then((userMatches) => {
          expect(userMatches[thatUserId]).toBe(DATA_KEYS["MATCH_ACCEPTED"])
          done()
        })
        .catch((err) => done(err))
    })
  })
})

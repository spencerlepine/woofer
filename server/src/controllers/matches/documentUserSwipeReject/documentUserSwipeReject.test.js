const request = require("supertest")
const documentUserSwipeReject = require("./index")
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

describe("documentUserSwipeReject helper", () => {
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

    const result = documentUserSwipeReject(res, endpointObj, thisUserId, thatUserId)
    expect(result.constructor).toBe(Promise)
  })

  test("should throw an error with missing arguments", (done) => {
    documentUserSwipeReject()
      .then(() => { })
      .catch((err) => err)
      .then((possibleErr) => {
        expect(possibleErr).toBeTruthy()
        done()
      })
  })

  test("should fail given invalid arguments", (done) => {
    documentUserSwipeReject({}, endpointObj, thisUserId, thatUserId)
      .then(() => { })
      .catch((err) => err)
      .then((possibleErr) => {
        expect(possibleErr).toBeTruthy()
        done()
      })
  })

  test("should resolve given valid arguments", (done) => {
    documentUserSwipeReject(res, endpointObj, thisUserId, thatUserId)
      .then(() => { })
      .catch((err) => err)
      .then((possibleErr) => {
        expect(possibleErr).not.toBeTruthy()
        done()
      })
  })

  describe("Updating the match records", () => {
    test("Should save the rejection in user match records", (done) => {
      const body = {
        [DATA_KEYS["THIS_USER_ID"]]: thisUserId,
        [DATA_KEYS["THAT_USER_ID"]]: thatUserId,
        [DATA_KEYS["MATCH_STATUS"]]: DATA_KEYS["MATCH_REJECT"],
      }

      // POST the match rejection
      request(app)
        .post(url)
        .send(body)
        .then((response) => {
          // ASSERT the response
          expect(response).toBeDefined()
          expect(typeof result).toBe("object")
          expect(response[DATA_KEYS["CHAT_ID"]]).not.toBeTruthy()
          expect(response[DATA_KEYS["USER_PROFILE"]]).not.toBeTruthy()
        })
        .then(() => fetchMatchRecord(res, { [DATA_KEYS["USER_MATCHES"]]: thisUserId }))
        .then((matchRecord) => {
          const {
            [DATA_KEYS["USER_MATCHES"]]: userMatches
          } = matchRecord
          expect(userMatches[thatUserId]).toBe(DATA_KEYS["MATCH_REJECTED"])
          done()
        })
        .catch((err) => done(err))
    })
  })
})

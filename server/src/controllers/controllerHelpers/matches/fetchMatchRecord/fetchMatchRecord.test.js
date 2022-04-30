const request = require("supertest")
const fetchMatchRecord = require("./index")

const { saveUserSwipeChoice } = require("../../../matches")
const {
  app,
  constants: { DATA_KEYS, endpointURLStr },
  signupMockUser,
  mockUser,
  mockUserB,
  mockRes,
} = global.testHelpers

describe("Fetch match record document", () => {
  const idKey = DATA_KEYS["USER_ID"]
  const userId = mockUser[idKey]
  const thatUserId = mockUserB[idKey]

  test("should resolve with valid arguments", (done) => {
    const query = { userId }

    const result = fetchMatchRecord(mockRes, query)
    expect(result.constructor).toBe(Promise)

    result
      .then(() => {})
      .catch((err) => err)
      .then((possibleErr) => {
        expect(possibleErr).not.toBeTruthy()
        done()
      })
  })

  test("should throw an error with missing or invalid arguments", (done) => {
    fetchMatchRecord()
      .then(() => {})
      .catch((err) => err)
      .then((possibleErr) => {
        expect(possibleErr).toBeTruthy()
        done()
      })
  })

  test("should return a match record", (done) => {
    const swipe = DATA_KEYS["MATCH_ACCEPT"]
    const postUserMatch = () => {
      const method = "POST"
      const endpointPaths = ["MATCHES", "SWIPE"]
      const url = endpointURLStr(endpointPaths, method)
      const body = {
        [DATA_KEYS["THIS_USER_ID"]]: userId,
        [DATA_KEYS["THAT_USER_ID"]]: thatUserId,
        [DATA_KEYS["MATCH_STATUS"]]: swipe,
      }

      return request(app).post(url).send(body)
    }

    signupMockUser(mockUser)
      .then(() => signupMockUser(mockUserB))
      .then(() => postUserMatch(swipe))
      .then(() => {
        const query = { userId }
        return fetchMatchRecord(mockRes, query)
      })
      .then((matchRecordDoc) => {
        expect(matchRecordDoc).toBeDefined()
      })
      .catch((err) => err)
      .then((possibleErr) => {
        expect(possibleErr).not.toBeTruthy()
        done(possibleErr)
      })
  })
})

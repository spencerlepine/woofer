const request = require("supertest")
const verifyUserMatchStatus = require("./index")

const {
  constants: { DATA_KEYS, endpointURLStr },
  mockUser,
  mockUserB,
  signupMockUser,
  app
} = global.testHelpers

const idKey = DATA_KEYS["USER_ID"]
const thisUserId = mockUser[idKey]
const thatUserId = mockUserB[idKey]

const saveUserSwipe = (thisUserID, thatUserID, swipe) => {
  const url = endpointURLStr(["MATCHES", "SWIPE"], "POST")

  const body = {
    [DATA_KEYS["THIS_USER_ID"]]: thisUserID,
    [DATA_KEYS["THAT_USER_ID"]]: thatUserID,
    [DATA_KEYS["MATCH_STATUS"]]: swipe,
  }

  return request(app)
    .post(url)
    .send(body)
}

describe("verifyUserMatchStatus helper", () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn()
  }

  test("should return a promise", () => {
    const query = { idKey: thisUserId }

    const result = verifyUserMatchStatus(res, thisUserId, thatUserId)
    expect(result.constructor).toBe(Promise)
  })

  test("should throw an error with missing arguments", (done) => {
    verifyUserMatchStatus()
      .then(() => { })
      .catch((err) => err)
      .then((possibleErr) => {
        expect(possibleErr).toBeTruthy()
        done()
      })
  })

  test("should fail given invalid arguments", (done) => {
    verifyUserMatchStatus({}, "", "")
      .then(() => { })
      .catch((err) => err)
      .then((possibleErr) => {
        expect(possibleErr).toBeTruthy()
        done()
      })
  })

  test("should resolve given valid arguments", (done) => {
    verifyUserMatchStatus(res, thisUserId, thatUserId)
      .then(() => { })
      .catch((err) => err)
      .then((possibleErr) => {
        expect(possibleErr).not.toBeTruthy()
        done()
      })
  })

  test("should return a user profile and match status", (done) => {
    verifyUserMatchStatus(res, thisUserId, thatUserId)
      .catch((err) => null)
      .then((result) => {
        expect(result).toBeTruthy()
        expect(typeof result).toBe("object")
        expect(DATA_KEYS["USER_PROFILE"] in result).toBeTruthy()
        expect("matchIsValid" in result).toBeTruthy()
        done()
      })
  })

  describe("Handles existing match in records", () => {
    test("Rejects an existing user match", (done) => {
      const testArrange = Promise.all([
        signupMockUser(mockUser),
        signupMockUser(mockUserB)
      ])

      testArrange
        .then(() => {
          // Swipe YES on the other user
          const acceptSwipe = DATA_KEYS["MATCH_ACCEPT"];
          return saveUserSwipe(thisUserId, thatUserId, acceptSwipe)
        })
        .then(() => {
          // Verify that would reject a previous match?
          return verifyUserMatchStatus(res, thisUserId, thatUserId)
        })
        .then((result) => {
          // ASSERT
          expect(result).toBeTruthy()
          expect(typeof result).toBe("object")
          expect(DATA_KEYS["USER_PROFILE"] in result).toBeTruthy()
          expect("matchIsValid" in result).toBeTruthy()
          expect(result.matchIsValid).toBe(false)
          done()
        })
        .catch((err) => done(err))
    })

    test("Accepts a first time user match", (done) => {
      const testArrange = Promise.all([
        signupMockUser(mockUser),
        signupMockUser(mockUserB)
      ])

      testArrange
        .then(() => {
          // Verify that would accept a brand new match?
          return verifyUserMatchStatus(res, thisUserId, thatUserId)
        })
        .then((result) => {
          // ASSERT
          expect(result).toBeTruthy()
          expect(typeof result).toBe("object")
          expect(DATA_KEYS["USER_PROFILE"] in result).toBeTruthy()
          expect("matchIsValid" in result).toBeTruthy()
          expect(result.matchIsValid).toBe(true)
          done()
        })
        .catch((err) => done(err))
    })
  })
})
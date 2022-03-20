const request = require("supertest")
const randomUserFromZipcodePool = require("./index")
const addUserToZipcodePool = require("../../controllerHelpers/zipcodes/addUserToZipcodePool")

const {
  constants: { DATA_KEYS, endpointURLStr },
  mockUser,
  mockUserB,
  signupMockUser,
  app,
  mockRes,
} = global.testHelpers

const idKey = DATA_KEYS["USER_ID"]
const thisUserId = mockUser[idKey]
const thatUserId = mockUserB[idKey]
const thatUserGender = mockUserB[DATA_KEYS["USER_GENDER"]]

describe("randomUserFromZipcodePool helper", () => {
  test("should return a promise", () => {
    const query = { idKey: thisUserId }

    const result = randomUserFromZipcodePool()
      .catch(err => { }) // ignore the error
    expect(result.constructor).toBe(Promise)
  })

  test("should throw an error with missing arguments", (done) => {
    randomUserFromZipcodePool()
      .then(() => { })
      .catch((err) => err)
      .then((possibleErr) => {
        expect(possibleErr).toBeTruthy()
        done()
      })
  })

  test("should fail given invalid arguments", (done) => {
    randomUserFromZipcodePool({}, "", null, "Male")
      .then(() => { })
      .catch((err) => err)
      .then((possibleErr) => {
        expect(possibleErr).toBeTruthy()
        done()
      })
  })

  test("should resolve given valid arguments", (done) => {
    randomUserFromZipcodePool(mockRes, thisUserId, ["10001"], "Male")
      .then(() => { })
      .catch((err) => err)
      .then((possibleErr) => {
        expect(possibleErr).not.toBeTruthy()
        done()
      })
  })

  describe("Handles finding random valid user records", () => {
    test("Fails to find a possible match in empty zipcode pool", (done) => {
      // Should not return a user when the pool is empty
      const zipcode = "10001"

      signupMockUser(mockUser)
        // .then(() => addUserToZipcodePool(res, zipcode, thisUserId))
        .then(() => {
          // Verify that would accept a brand new match?
          return randomUserFromZipcodePool(mockRes, thisUserId, thatUserId, thatUserGender)
        })
        .then((result) => {
          // ASSERT
          expect(result).toBeTruthy()
          expect(typeof result).toBe("object")
          expect(DATA_KEYS["USER_PROFILE"] in result).toBeTruthy()
          expect(result[DATA_KEYS["USER_PROFILE"]]).toBe(null)
          done()
        })
        .catch((err) => done(err))
    })


    test("Returns a random user when match is found", (done) => {
      const zipcode = "10001"

      signupMockUser(mockUser)
        .then(() => addUserToZipcodePool(mockRes, zipcode, thisUserId))
        .then(() => {
          // Verify that would accept a brand new match?
          return randomUserFromZipcodePool(mockRes, thisUserId, thatUserId, thatUserGender)
        })
        .then((result) => {
          // ASSERT
          expect(result).toBeTruthy()
          expect(typeof result).toBe("object")
          expect(DATA_KEYS["USER_PROFILE"] in result).toBeTruthy()
          expect(result[DATA_KEYS["USER_PROFILE"]]).not.toBe(null)
          done()
        })
        .catch((err) => done(err))
    })
  })
})

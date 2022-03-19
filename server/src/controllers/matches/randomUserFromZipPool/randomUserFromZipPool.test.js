const request = require("supertest")
const randomUserFromZipcodePool = require("./index")
const addUserToZipcodePool = require("../../controllerHelpers/zipcodes/addUserToZipcodePool")

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

describe("randomUserFromZipcodePool helper", () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    setHeader: jest.fn(),
    end: jest.fn((r) => r),
  }

  test("should return a promise", () => {
    const query = { idKey: thisUserId }

    const result = randomUserFromZipcodePool(res, thisUserId, [], "Male")
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
    randomUserFromZipcodePool({}, "", "")
      .then(() => { })
      .catch((err) => err)
      .then((possibleErr) => {
        expect(possibleErr).toBeTruthy()
        done()
      })
  })

  test("should resolve given valid arguments", (done) => {
    randomUserFromZipcodePool(res, thisUserId, [], "Male")
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
          return randomUserFromZipcodePool(res, thisUserId, thatUserId)
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
  })

  test("Returns a random user when match is found", (done) => {
    const zipcode = "10001"

    signupMockUser(mockUser)
      .then(() => addUserToZipcodePool(res, zipcode, thisUserId))
      .then(() => {
        // Verify that would accept a brand new match?
        return randomUserFromZipcodePool(res, thisUserId, thatUserId)
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
    // const zipcode = "10001"
    // const testArrange = Promise.all([
    //   signupMockUser(mockUser),
    //   signupMockUser(mockUserB),
    //   addUserToZipcodePool(res, zipcode, thisUserId),
    //   addUserToZipcodePool(res, zipcode, thatUserId)
    // ])

    // testArrange
    //   .then(() => {
    //     // Verify that would accept a brand new match?
    //     return randomUserFromZipcodePool(res, thisUserId, thatUserId)
    //   })
    //   .then((result) => {
    //     // ASSERT
    //     expect(result).toBeTruthy()
    //     expect(typeof result).toBe("object")
    //     expect(DATA_KEYS["USER_PROFILE"] in result).toBeTruthy()
    //     expect("matchIsValid" in result).toBeTruthy()
    //     expect(result.matchIsValid).toBe(true)
    //     done()
    //   })
    //   .catch((err) => done(err))
  })
})

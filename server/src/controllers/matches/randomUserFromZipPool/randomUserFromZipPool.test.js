const request = require("supertest")
const randomUserFromZipcodePool = require("./index")
const addUserToZipcodePool = require("../../controllerHelpers/zipcodes/addUserToZipcodePool")

const {
  constants: { DATA_KEYS, endpointURLStr },
  app,
  mockRes,
} = global.testHelpers

describe("randomUserFromZipcodePool helper", () => {
  test("should return a promise", () => {
    const result = randomUserFromZipcodePool().catch((err) => {}) // ignore the error
    expect(result.constructor).toBe(Promise)
  })

  test("should throw an error with missing arguments", (done) => {
    randomUserFromZipcodePool()
      .then(() => {})
      .catch((err) => err)
      .then((possibleErr) => {
        expect(possibleErr).toBeTruthy()
        done()
      })
  })
})

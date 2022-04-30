const removeUserFromZipcodePool = require("./index")

describe("Remove user to zipcode pool helper", () => {
  const userId = "john1234"
  const zipcodeID = "10001"

  test("should resolve with valid arguments", (done) => {
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    }

    const result = removeUserFromZipcodePool(res, userId, zipcodeID)
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
    removeUserFromZipcodePool()
      .then(() => {})
      .catch((err) => err)
      .then((possibleErr) => {
        expect(possibleErr).toBeTruthy()
        done()
      })
  })
})

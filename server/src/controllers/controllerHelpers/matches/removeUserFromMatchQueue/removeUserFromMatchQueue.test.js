const removeUserFromMatchQueue = require("./index")

describe("Remove user from match record document", () => {
  const userID = "john1234"

  test("should resolve with valid arguments", (done) => {
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    }

    const result = removeUserFromMatchQueue(res, userID, "bob1234")
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
    removeUserFromMatchQueue()
      .then(() => {})
      .catch((err) => err)
      .then((possibleErr) => {
        expect(possibleErr).toBeTruthy()
        done()
      })
  })
})

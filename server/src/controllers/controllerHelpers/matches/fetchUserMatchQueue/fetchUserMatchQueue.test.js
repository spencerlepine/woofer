const fetchUserMatchQueue = require("./index")

describe("Fetch match queue document", () => {
  const userID = "john1234"

  test("should resolve with valid arguments", (done) => {
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    }

    const result = fetchUserMatchQueue(res, userID, "bob1234")
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
    fetchUserMatchQueue()
      .then(() => {})
      .catch((err) => err)
      .then((possibleErr) => {
        expect(possibleErr).toBeTruthy()
        done()
      })
  })
})

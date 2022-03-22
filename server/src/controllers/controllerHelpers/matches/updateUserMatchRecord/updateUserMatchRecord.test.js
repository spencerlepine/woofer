const udpateUseMatchRecord = require("./index")

describe("Update user match record document", () => {
  const userID = "john1234"

  test("should resolve with valid arguments", (done) => {
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    }
    const query = { id: userID }
    const update = {
      $set: {
        name: "JohnDoe",
      },
    }
    const options = {}

    const result = udpateUseMatchRecord(res, query, update, options)
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
    udpateUseMatchRecord()
      .then(() => {})
      .catch((err) => err)
      .then((possibleErr) => {
        expect(possibleErr).toBeTruthy()
        done()
      })
  })
})
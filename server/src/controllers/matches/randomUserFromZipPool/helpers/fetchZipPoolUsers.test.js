const fetchZipPoolUsers = require("./fetchZipPoolUsers")

describe("Fetch Users From ZipCode Pool", () => {
  test("should return a promise", () => {
    const result = fetchZipPoolUsers("").catch((err) => {}) // ignore the error
    expect(result.constructor).toBe(Promise)
  })

  test("should throw an error with missing arguments", (done) => {
    fetchZipPoolUsers()
      .then(() => {})
      .catch((err) => err)
      .then((possibleErr) => {
        expect(possibleErr).toBeTruthy()
        done()
      })
  })
})

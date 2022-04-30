const removeUserFromChat = require("./index")

describe("removeUserFromChat controller helper", () => {
  test("should throw an error with invalid arguments", (done) => {
    removeUserFromChat().catch((err) => {
      expect(err).toBeTruthy()
      done
    })
  })

  test("should return a promise", () => {})
})

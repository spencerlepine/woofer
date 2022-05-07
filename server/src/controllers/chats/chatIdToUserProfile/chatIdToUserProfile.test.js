const { mockUser, mockUserB, signupMockUser, modelHelpers } = global.testHelpers

const chatIdToUserProfile = require("./index")

describe("chatIdToUserProfile controller helper", () => {
  describe("with invalid arguments", () => {
    test("should return a promise", () => {
      const result = chatIdToUserProfile()
      expect(result.constructor).toBe(Promise)
    })

    test("should throw an error with invalid arguments", (done) => {
      chatIdToUserProfile()
        .catch((err) => {
          expect(err).toBeTruthy()
          done(err)
        })
        .then(() => {
          done()
        })
    })
  })
})

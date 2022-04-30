const { mockUser, mockUserB, signupMockUser, modelHelpers } = global.testHelpers

const generateMoreQueueMatches = require("./index")

describe("generateMoreQueueMatches controller helper", () => {
  describe("with invalid arguments", () => {
    test("should return a promise", () => {
      const result = generateMoreQueueMatches()
      expect(result.constructor).toBe(Promise)
    })

    test("should throw an error with invalid arguments", (done) => {
      generateMoreQueueMatches()
        .catch((err) => {
          expect(err).toBeTruthy()
          done(err)
        })
        .then(() => {
          done()
        })
    })
  })

  describe("with valid arguments", () => {
    const userId = mockUser["userId"]

    test("should resolve with user match record", (done) => {
      signupMockUser(mockUser)
        .then(() => generateMoreQueueMatches(userId))
        .then((result) => {
          expect(result).toBeDefined()
          expect(result).toHaveProperty("matchQueue")
          const { matchQueue } = result
          expect(Array.isArray(matchQueue)).toBeTruthy()
          done()
        })
        .catch(done)
    })
  })
})

const { mockUser, mockUserB, signupMockUser, modelHelpers } = global.testHelpers

const generateMatchStatus = require("./index")

describe("generateMatchStatus controller helper", () => {
  describe("with invalid arguments", () => {
    test("should return a promise", () => {
      const result = generateMatchStatus()
      expect(result.constructor).toBe(Promise)
    })

    test("should throw an error with invalid arguments", (done) => {
      generateMatchStatus()
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
    const thisUserId = mockUser["userId"]
    const thatUserId = mockUserB["userId"]

    test("should resolve with user match status", (done) => {
      signupMockUser(mockUser)
        .then(() => signupMockUser(mockUserB))
        .then(() => generateMatchStatus(thisUserId, thatUserId))
        .then((userProfile) => {
          expect(userProfile).toBeDefined()
          expect(userProfile).toHaveProperty(thisUserId, "none")
          expect(userProfile).toHaveProperty(thatUserId, "none")
          done()
        })
        .catch(done)
    })
  })
})

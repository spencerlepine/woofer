const { mockUser, mockUserB, signupMockUser, modelHelpers } = global.testHelpers

const updateSwipeRecord = require("./index")

describe("updateSwipeRecord controller helper", () => {
  describe("with invalid arguments", () => {
    test("should return a promise", () => {
      const result = updateSwipeRecord()
      expect(result.constructor).toBe(Promise)
    })

    test("should throw an error with invalid arguments", (done) => {
      updateSwipeRecord()
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
    const matchStatus = "accept"

    test("should resolve updated match record", (done) => {
      signupMockUser(mockUser)
        .then(() => signupMockUser(mockUserB))
        .then(() =>
          updateSwipeRecord(mockUser["userId"], mockUserB["userId"], "accept")
        )
        .then((result) => {
          expect(result).toBeDefined()
          expect(result).toHaveProperty("userId", thisUserId)
          expect(result).toHaveProperty("userMatches")
          done()
        })
        .catch(done)
    })
  })
})

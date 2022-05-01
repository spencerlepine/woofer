const { mockUser, mockUserB, signupMockUser, modelHelpers } = global.testHelpers

const gatherPreviousUserMatches = require("./index")
const updateSwipeRecord = require("../updateSwipeRecord")

describe("gatherPreviousUserMatches controller helper", () => {
  describe("with invalid arguments", () => {
    test("should return a promise", () => {
      const result = gatherPreviousUserMatches()
      expect(result.constructor).toBe(Promise)
    })

    test("should throw an error with invalid arguments", (done) => {
      gatherPreviousUserMatches()
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
        .then(() => gatherPreviousUserMatches(userId))
        .then((result) => {
          expect(result).toBeDefined()
          expect(result).toHaveProperty("userMatches")
          const { userMatches } = result
          expect(userMatches).toEqual({})
          done()
        })
        .catch(done)
    })

    test("should resolve with updated user match record", (done) => {
      signupMockUser(mockUser)
        .then(() => signupMockUser(mockUserB))
        .then(() =>
          updateSwipeRecord(mockUser["userId"], mockUserB["userId"], "accept")
        )
        .then((result) => {
          expect(result).toBeDefined()
          expect(result).toHaveProperty("userMatches")
          const { userMatches } = result
          expect(userMatches).toEqual({
            [mockUserB["userId"]]: "accept",
          })
          done()
        })
        .catch(done)
    })
  })
})

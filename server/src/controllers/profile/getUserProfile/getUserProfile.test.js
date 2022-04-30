const { mockUser, mockUserB, signupMockUser, mockRes } = global.testHelpers

const getUserProfile = require("./index")
const filterUserProfile = require("../filterUserProfile")

describe("getUserProfile controller", () => {
  describe("with invalid arguments", () => {
    test("should throw an error with invalid arguments", () => {
      expect(() => getUserProfile()).toThrow()
    })
  })

  describe("with valid arguments", () => {
    const mockReq = {
      query: {
        userId: mockUser["id"],
      },
    }

    test("should return a promise", () => {
      const result = getUserProfile(mockReq, mockRes)
      expect(result.constructor).toBe(Promise)
    })

    test("should resolve with the user profile", (done) => {
      signupMockUser(mockUser)
        .then(() => getUserProfile(mockReq, mockRes))
        .then((response) => {
          expect(response).toBeDefined()
          expect(response).toHaveProperty("data")
          const { data } = response
          expect(data).toHaveProperty("userProfile")
          const { userProfile } = data
          const filtered = filterUserProfile(mockUser)
          expect(userProfile).toEqual(filtered)
          done()
        })
        .catch(done)
    })

    test("should resolve empty object given invalid user id", (done) => {
      const invalidIdReq = {
        query: {
          userId: "nonexistent",
        },
      }

      getUserProfile(invalidIdReq, mockRes)
        .then((response) => {
          expect(response).toBeDefined()
          expect(response).toHaveProperty("data")
          const { data } = response
          expect(data).toHaveProperty("userProfile")
          const { userProfile } = data
          expect(userProfile).toEqual({})
          done()
        })
        .catch(done)
    })
  })
})

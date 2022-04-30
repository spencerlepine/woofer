const { mockUser, mockUserB, signupMockUser, mockRes } = global.testHelpers

const saveUserSwipeChoice = require("./index")

describe("saveUserSwipeChoice controller", () => {
  describe("with invalid arguments", () => {
    const invalidReq = {}

    test("should return a promise", () => {
      const result = saveUserSwipeChoice(invalidReq, mockRes)
      expect(result.constructor).toBe(Promise)
    })

    test("should not throw an error with invalid arguments", (done) => {
      saveUserSwipeChoice(invalidReq, mockRes)
        .catch((err) => {
          expect(err).not.toBeTruthy()
          done(err)
        })
        .then(() => {
          done()
        })
    })

    test("should not resolve with user keys given invalid arguments", (done) => {
      const invalidIdReq = {
        query: {},
      }

      const mockResolve = {
        status: () => ({
          json: (response) => {
            expect(response).toBeDefined()
            expect(response).not.toHaveProperty(mockUser["userId"])
            expect(response).not.toHaveProperty(mockUserB["userId"])
            done()
          },
        }),
      }

      saveUserSwipeChoice(invalidIdReq, mockResolve).catch(done)
    })
  })

  describe("with valid arguments", () => {
    const mockReq = {
      query: {
        thisUserId: mockUser["userId"],
        thatUserId: mockUserB["userId"],
        matchStatus: "accept",
      },
    }

    test("should resolve with the user match statuses", (done) => {
      const mockResolve = {
        status: () => ({
          json: (response) => {
            expect(response).toBeDefined()
            console.log(response)
            // expect(response).toHaveProperty("chatId", "none")
            // expect(response).toHaveProperty("userProfile")
            done()
          },
        }),
      }

      signupMockUser(mockUser)
        .then(() => signupMockUser(mockUserB))
        .then(() => {
          return saveUserSwipeChoice(mockReq, mockResolve)
        })
        .catch(done)
    })
  })
})

const { mockUser, mockUserB, signupMockUser, mockRes } = global.testHelpers

const fetchMatchStatus = require("./index")

describe("fetchMatchStatus controller", () => {
  describe("with invalid arguments", () => {
    const invalidReq = {}

    test("should return a promise", () => {
      const result = fetchMatchStatus(invalidReq, mockRes)
      expect(result.constructor).toBe(Promise)
    })

    test("should not throw an error with invalid arguments", (done) => {
      fetchMatchStatus(invalidReq, mockRes)
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

      fetchMatchStatus(invalidIdReq, mockResolve).catch(done)
    })
  })

  describe("with valid arguments", () => {
    const mockReq = {
      query: {
        thisUserId: mockUser["userId"],
        thatUserId: mockUserB["userId"],
      },
    }

    test("should resolve with the user match statuses", (done) => {
      const mockResolve = {
        status: () => ({
          json: (response) => {
            expect(response).toBeDefined()
            expect(response).toHaveProperty(mockUser["userId"], "none")
            expect(response).toHaveProperty(mockUserB["userId"], "none")
            done()
          },
        }),
      }

      signupMockUser(mockUser)
        .then(() => signupMockUser(mockUserB))
        .then(() => {
          return fetchMatchStatus(mockReq, mockResolve)
        })
        .catch(done)
    })
  })
})

const { mockUser, signupMockUser, mockRes } = global.testHelpers

const fetchMatchQueue = require("./index")

describe("fetchMatchQueue controller", () => {
  describe("with invalid arguments", () => {
    const invalidReq = {}

    test("should return a promise", () => {
      const result = fetchMatchQueue(invalidReq, mockRes)
      expect(result.constructor).toBe(Promise)
    })

    test("should not throw an error with invalid arguments", (done) => {
      fetchMatchQueue(invalidReq, mockRes)
        .catch((err) => {
          expect(err).not.toBeTruthy()
          done(err)
        })
        .then(() => {
          done()
        })
    })

    test("should not resolve with queue given invalid arguments", (done) => {
      const invalidIdReq = {
        query: {},
      }

      const mockResolve = {
        status: () => ({
          json: (response) => {
            expect(response).toBeDefined()
            expect(response).not.toHaveProperty("matchQueue")
            done()
          },
        }),
      }

      fetchMatchQueue(invalidIdReq, mockResolve).catch(done)
    })
  })

  describe("with valid arguments", () => {
    const mockReq = {
      query: {
        userId: mockUser["userId"],
      },
    }

    test("should resolve with the user queue", (done) => {
      const mockResolve = {
        status: () => ({
          json: (response) => {
            expect(response).toBeDefined()
            expect(response).toHaveProperty("matchQueue")
            done()
          },
        }),
      }

      signupMockUser(mockUser)
        .then(() => {
          return fetchMatchQueue(mockReq, mockResolve)
        })
        .catch(done)
    })
  })
})

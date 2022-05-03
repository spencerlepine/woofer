const { mockUser, mockUserB, signupMockUser } = global.testHelpers

const saveUserSwipeChoice = require("./index")
const updateSwipeRecord = require("../updateSwipeRecord")

describe("saveUserSwipeChoice controller", () => {
  const mockRes = {
    status: jest.fn(() => mockRes),
    json: jest.fn(),
    setHeader: jest.fn(),
    end: jest.fn((r) => r),
  }

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

    test("should resolve with empty keys given invalid arguments", (done) => {
      const invalidIdReq = {
        query: {},
      }

      const mockResolve = {
        status: () => ({
          json: (response) => {
            expect(response).toBeDefined()
            expect(response).toHaveProperty("chatId", "none")
            expect(response.userProfile).toEqual({})
            done()
          },
        }),
      }

      saveUserSwipeChoice(invalidIdReq, mockResolve).catch(done)
    })
  })

  describe("with valid arguments", () => {
    test("should resolve with the user match statuses", (done) => {
      const mockReq = {
        body: {
          thisUserId: mockUser["userId"],
          thatUserId: mockUserB["userId"],
          matchStatus: "accept",
        },
      }

      const mockResolve = {
        status: () => ({
          json: (response) => {
            expect(response).toBeDefined()
            expect(response).toHaveProperty("chatId", "none")
            expect(response).toHaveProperty("userProfile")
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

    test("should resolve a chatId on mutual match", (done) => {
      const mockReq = {
        body: {
          thisUserId: mockUser["userId"],
          thatUserId: mockUserB["userId"],
          matchStatus: "accept",
        },
      }

      const mockMutualResolve = {
        status: () => ({
          json: (response) => {
            expect(response).toBeDefined()
            expect(response).toHaveProperty("chatId")
            const { chatId } = response
            expect(chatId).not.toBe("none")
            expect(response).toHaveProperty("userProfile")
            done()
          },
        }),
      }

      signupMockUser(mockUser)
        .then(() => signupMockUser(mockUserB))
        .then(() =>
          updateSwipeRecord(mockUserB["userId"], mockUser["userId"], "accept")
        )
        .then(() => {
          return saveUserSwipeChoice(mockReq, mockMutualResolve)
        })
        .catch(done)
    })
  })
})

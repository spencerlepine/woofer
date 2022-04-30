const { mockUser, mockUserB, signupMockUser } = global.testHelpers

const fetchPossibleMatch = require("./index")
const userToZipPoolDoc = require("../../zipcodes/userToZipPoolDoc")

describe("fetchPossibleMatch controller", () => {
  const mockRes = {
    status: jest.fn(() => mockRes),
    json: jest.fn(),
    setHeader: jest.fn(),
    end: jest.fn((r) => r),
  }

  describe("with invalid arguments", () => {
    const invalidReq = {}

    test("should return a promise", () => {
      const result = fetchPossibleMatch(invalidReq, mockRes)
      expect(result.constructor).toBe(Promise)
    })

    test("should not throw an error with invalid arguments", (done) => {
      fetchPossibleMatch(invalidReq, mockRes)
        .catch((err) => {
          expect(err).not.toBeTruthy()
          done(err)
        })
        .then(() => {
          done()
        })
    })

    test("should resolve with null userProfile if no possible match is found", (done) => {
      const invalidIdReq = {
        query: {},
      }

      const mockResolve = {
        status: () => ({
          json: (response) => {
            expect(response).toBeDefined()
            expect(response).toHaveProperty("userProfile", null)
            done()
          },
        }),
      }

      fetchPossibleMatch(invalidIdReq, mockResolve).catch(done)
    })
  })

  describe("with valid arguments", () => {
    test("should resolve with a user profile", (done) => {
      const mockZipcode = "10001"

      const mockReq = {
        query: {
          userId: mockUser["userId"],
        },
      }

      const mockResolve = {
        status: () => ({
          json: (response) => {
            expect(response).toBeDefined()
            expect(response).toHaveProperty("userProfile")
            const { userProfile } = response
            expect(userProfile).toBeTruthy()
            expect(userProfile).toHaveProperty("userId", mockUserB["userId"])
            expect(userProfile).toHaveProperty("gender", mockUserB["gender"])
            done()
          },
        }),
      }

      signupMockUser(mockUser)
        .then(() => signupMockUser(mockUserB))
        .then(() => userToZipPoolDoc(mockUser["userId"], mockZipcode))
        .then(() => userToZipPoolDoc(mockUserB["userId"], mockZipcode))
        .then(() => {
          return fetchPossibleMatch(mockReq, mockResolve)
        })
        .catch(done)
    })
  })
})

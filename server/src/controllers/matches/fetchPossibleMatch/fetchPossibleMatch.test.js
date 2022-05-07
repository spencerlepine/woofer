const { mockUser: placeholderUser, mockUserB, signupMockUser } = global.testHelpers

const mockUser = Object.assign(placeholderUser)
mockUser["userId"] = "120981480"

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
    const zipcode = "10001"
    const mockUserC = Object.create(mockUser)
    mockUserC["preference"] = mockUser["gender"]
    const mockUserD = Object.create(mockUser)
    mockUserD["preference"] = mockUser["gender"]
    const mockUserE = Object.create(mockUser)
    mockUserE["preference"] = mockUser["gender"]
    const mockUserF = Object.create(mockUser)
    mockUserF["preference"] = mockUser["gender"]
    const mockUserG = Object.create(mockUser)
    mockUserG["preference"] = mockUser["gender"]

    const mockUserIds = [
      mockUserB,
      mockUserC,
      mockUserD,
      mockUserE,
      mockUserF,
      mockUserG,
    ].map((userObj) => userObj["userId"])

    test("should resolve with a user profile", (done) => {
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
            expect(userProfile).toHaveProperty("userId")
            const resultUserId = userProfile["userId"]
            expect(mockUserIds.includes(resultUserId)).toBeTruthy()
            expect(userProfile).toHaveProperty("gender")
            done()
          },
        }),
      }

      signupMockUser(mockUser)
        .then(() => userToZipPoolDoc(mockUser["userId"], zipcode))
        .then(() => signupMockUser(mockUserB))
        .then(() => userToZipPoolDoc(mockUserB["userId"], zipcode))
        .then(() => signupMockUser(mockUserC))
        .then(() => userToZipPoolDoc(mockUserC["userId"], zipcode))
        .then(() => signupMockUser(mockUserD))
        .then(() => userToZipPoolDoc(mockUserD["userId"], zipcode))
        .then(() => signupMockUser(mockUserF))
        .then(() => userToZipPoolDoc(mockUserF["userId"], zipcode))
        .then(() => signupMockUser(mockUserG))
        .then(() => userToZipPoolDoc(mockUserG["userId"], zipcode))
        .then(() => userToZipPoolDoc(mockUser["userId"], zipcode))
        .then(() => userToZipPoolDoc(mockUserB["userId"], zipcode))
        .then(() => {
          return fetchPossibleMatch(mockReq, mockResolve)
        })
        .catch(done)
    })
  })
})

const request = require("supertest")

const {
  app,
  mockUser,
  mockUserB,
  verifyEndpointResponse,
  signupMockUser,
  // addUserToZip,
} = require("../utils/test-helpers")

const userToZipPoolDoc = require("../../src/controllers/zipcodes/userToZipPoolDoc")

const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
  setHeader: jest.fn(),
  end: jest.fn((r) => r),
}
const zipcode = "10001"
const idKey = "userId"
const thisUserId = mockUser[idKey]
const thatUserId = mockUserB[idKey]

const method = "GET"
const url = "/api/matches/generate"

describe("MATCHES endpoint match generation", () => {
  describe("should find a possible match user", () => {
    const zipcode = "10001"
    const mockUserC = new Object(mockUser)
    mockUserC["preference"] = mockUser["gender"]
    const mockUserD = new Object(mockUser)
    mockUserD["preference"] = mockUser["gender"]
    const mockUserE = new Object(mockUser)
    mockUserE["preference"] = mockUser["gender"]
    const mockUserF = new Object(mockUser)
    mockUserF["preference"] = mockUser["gender"]
    const mockUserG = new Object(mockUser)
    mockUserG["preference"] = mockUser["gender"]

    const mockUserIds = [
      mockUserB,
      mockUserC,
      mockUserD,
      mockUserE,
      mockUserF,
      mockUserG,
    ].map((userObj) => userObj["userId"])

    test(`${method} ${url}`, (done) => {
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
          request(app)
            .get(url)
            .query({ ["userId"]: thisUserId })
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {
              expect(res.body).toBeDefined()
              const { userProfile: userProfile, matchIsValid } = res.body

              expect(userProfile).toBeDefined()
              expect(userProfile).toHaveProperty(
                "userProfile",
                mockUserB["userProfile"]
              )

              expect(userProfile).toHaveProperty("userId", mockUserB["userId"])

              expect(matchIsValid).toBeTruthy()
            })
        })
        .then(done)
        .catch((err) => done(err))
    })
  })
})

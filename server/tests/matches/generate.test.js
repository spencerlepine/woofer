const request = require("supertest")

const {
  app,
  mockUser: placeholderUser,
  mockUserB,
  signupMockUser,
} = global.testHelpers

const mockUser = Object.create(placeholderUser)
mockUser["userId"] = "120981480"

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
    const mockUserC = Object.create(mockUser)
    mockUserC["zipcodes"] = []
    mockUserC["preference"] = mockUser["gender"]
    const mockUserD = Object.create(mockUser)
    mockUserD["preference"] = mockUser["gender"]
    mockUserD["zipcodes"] = []
    const mockUserE = Object.create(mockUser)
    mockUserE["preference"] = mockUser["gender"]
    mockUserE["zipcodes"] = []
    const mockUserF = Object.create(mockUser)
    mockUserF["preference"] = mockUser["gender"]
    mockUserF["zipcodes"] = []
    const mockUserG = Object.create(mockUser)
    mockUserG["preference"] = mockUser["gender"]
    mockUserG["zipcodes"] = []

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
              const { userProfile: user, matchIsValid } = res.body
              expect(user).toBeDefined()
              expect(user).toHaveProperty("userId")
            })
            .end((err, res) => {
              if (err) return done(err)
              return done()
            })
        })
        .catch((err) => done(err))
    })
  })
})

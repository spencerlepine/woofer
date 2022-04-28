const request = require("supertest")

const addUserToZipcodePool = require("../../src/controllers/controllerHelpers/zipcodes/addUserToZipcodePool")

const {
  app,
  constants: { endpointURLStr, DATA_KEYS },
  mockUser,
  mockUserB,
  verifyEndpointResponse,
  signupMockUser,
  addUserToZip,
} = require("../utils/test-helpers")

const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
  setHeader: jest.fn(),
  end: jest.fn((r) => r),
}
const zipcode = "10001"
const idKey = DATA_KEYS["USER_ID"]
const thisUserId = mockUser[idKey]
const thatUserId = mockUserB[idKey]

const method = "GET"
const endpointPaths = ["MATCHES", "GENERATE"]
const endpointObj = { endpointPathKeys: endpointPaths, method }
const url = endpointURLStr(endpointPaths, method)

describe("MATCHES endpoint match generation", () => {
  describe("should find a possible match user", () => {
    const UserArrangeSteps = Promise.all([
      signupMockUser({
        ...mockUserB,
        [DATA_KEYS["USER_ZIPCODES"]]: [zipcode],
      }),
      signupMockUser({
        ...mockUser,
        [DATA_KEYS["USER_ZIPCODES"]]: [zipcode],
      }),
      addUserToZip(mockUser[DATA_KEYS["USER_ID"]], zipcode),
      addUserToZip(mockUserB[DATA_KEYS["USER_ID"]], zipcode),
    ])

    test(`${method} ${url}`, (done) => {
      UserArrangeSteps.then(() => {
        request(app)
          .get(url)
          .query({ [DATA_KEYS["USER_ID"]]: thisUserId })
          .expect("Content-Type", /json/)
          .expect(200)
          .expect((res) => {
            expect(res.body).toBeDefined()
            const { [DATA_KEYS["USER_PROFILE"]]: userProfile, matchIsValid } =
              res.body

            expect(userProfile).toBeDefined()
            expect(userProfile).toHaveProperty(
              DATA_KEYS["USER_PROFILE"],
              mockUserB[DATA_KEYS["USER_PROFILE"]]
            )

            expect(userProfile).toHaveProperty(
              DATA_KEYS["USER_ID"],
              mockUserB[DATA_KEYS["USER_ID"]]
            )

            expect(matchIsValid).toBeTruthy()
          })
      })
        .then(done)
        .catch((err) => done(err))
    })
  })
})

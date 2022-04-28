const request = require("supertest")

const {
  app,
  constants: { endpointURLStr, DATA_KEYS },
  mockUser,
  verifyEndpointResponse,
  signupMockUser,
} = require("./utils/test-helpers")

const addUserToZipCode = (userId, zipcode) => {
  const method = "POST"
  const endpointPaths = ["ZIPCODES", "ADD"]
  const url = endpointURLStr(endpointPaths, method)

  return request(app)
    .post(url)
    .send({
      [DATA_KEYS["USER_ID"]]: userId,
      [DATA_KEYS["ZIPCODE"]]: zipcode,
    })
}

const testAddZipCode = (url, endpointObj, done) => {
  signupMockUser(mockUser).then(() => {
    request(app)
      .post(url)
      .send({
        [DATA_KEYS["USER_ID"]]: mockUser[DATA_KEYS["USER_ID"]],
        [DATA_KEYS["ZIPCODE"]]: "10001",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .expect((res) => {
        const mockSuccessCallback = jest.fn()
        verifyEndpointResponse(res.body, res, endpointObj, mockSuccessCallback)
        expect(mockSuccessCallback.mock.calls.length).toBe(1)
        done()
      })
      .catch((err) => done(err))
  })
}

describe("ZIPCODES endpoint", () => {
  describe("Add a zipcode to user record", () => {
    const method = "POST"
    const endpointPaths = ["ZIPCODES", "ADD"]
    const url = endpointURLStr(endpointPaths, method)

    test(`${method} ${url}`, (done) => {
      testAddZipCode(url, { endpointPathKeys: endpointPaths, method }, done)
    })
  })

  describe("Delete a zipcode from user record", () => {
    const method = "DELETE"
    const endpointPaths = ["ZIPCODES", "REMOVE"]
    const url = endpointURLStr(endpointPaths, method)
    const params = {
      [DATA_KEYS["USER_ID"]]: mockUser[DATA_KEYS["USER_ID"]],
      [DATA_KEYS["ZIPCODE"]]: "10001",
    }

    test(`${method} ${url}`, (done) => {
      signupMockUser(mockUser)
        .then(() => addUserToZipCode(mockUser[DATA_KEYS["USER_ID"]], "10001"))
        .then(() => {
          request(app)
            .delete(url)
            .query(params)
            .expect("Content-Type", /json/)
            .expect(201)
            .end((err, res) => {
              if (err) return done(err)
              return done()
            })
        })
    })
  })
})

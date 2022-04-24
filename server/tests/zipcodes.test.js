const request = require("supertest")

const {
  app,
  constants: { endpointURLStr, DATA_KEYS },
  mockUser,
  verifyEndpointResponse,
  signupMockUser,
} = require("./utils/test-helpers")

const testAddZipCode = (url, endpointObj, done) => {
  signupMockUser(mockUser).then(() => {
    request(app)
      .post(url)
      .send({
        [DATA_KEYS["USER_ID"]]: mockUser[DATA_KEYS["USER_ID"]],
        [DATA_KEYS["ZIPCODE"]]: "123456",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .expect((res) => {
        const mockSuccessCallback = jest.fn()
        verifyEndpointResponse(res.body, res, endpointObj, mockSuccessCallback)
        expect(mockSuccessCallback.mock.calls.length).toBe(1)
      })
      .end((err, res) => {
        if (err) return done(err.stack)
        return done()
      })
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

    console.log(params)
    test(`${method} ${url}`, (done) => {
      testAddZipCode(url, { endpointPathKeys: endpointPaths, method }, () => {
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

const request = require("supertest")

const {
  app,
  constants: { endpointURLStr, DATA_KEYS },
  mockUser,
  verifyEndpointResponse,
  signupMockUser,
} = require("./utils/test-helpers")

describe("MATCHES endpoint", () => {
  describe("Generate a match", () => {
    const method = "GET"
    const endpointPaths = ["MATCHES", "GENERATE"]
    const endpointObj = { endpointPathKeys: endpointPaths, method }
    const url = endpointURLStr(endpointPaths, method)

    test(`${method} ${url}`, (done) => {
      signupMockUser(mockUser)
        .then(() => {
          request(app)
            .get(url)
            .send({ [DATA_KEYS["USER_ID"]]: mockUser[DATA_KEYS["USER_ID"]] })
            .expect("Content-Type", /json/)
            .expect(200)
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
        .catch((err) => done(err))
    })
  })
  /*
    describe("Save user swipe approval/rejection", () => {
      const method = "POST";
      const endpointPaths = ["MATCHES", "SWIPE"];
      const url = endpointURLStr(endpointPaths, method);

      test(`${method} ${url}`, (done) => {
        request(app)
          .post(url)
          .expect("Content-Type", /json/)
          .expect(201)
          .expect((res) => {
            expect(verifyEndpointResponse(res.body, res, { endpointPathKeys: endpointPaths, method })).toBe(true)
          })
          .end((err, res) => {
            if (err) return done(err.stack);
            return done();
          });
      });
    });
    */
})

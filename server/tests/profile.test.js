const request = require("supertest")

const {
  app,
  constants: { endpointURLStr, DATA_KEYS },
  mockUser,
  signupMockUser,
  verifyEndpointResponse,
} = require("./utils/test-helpers")

describe("PROFILE endpoint", () => {
  test("TODO", () => {
    expect(true).toBe(true)
  })

  describe("Fetch a single user profile", () => {
    const method = "GET";
    const endpointPaths = ["PROFILE"];
    const endpointObj = { endpointPathKeys: endpointPaths, method }
    const url = endpointURLStr(endpointPaths, method);

    const idToQuery = mockUser[DATA_KEYS["USER_ID"]];

    test(`${method} ${url}`, (done) => {
      signupMockUser(request, app, endpointURLStr, () => {
        request(app)
          .get(url)
          .query({ [DATA_KEYS["USER_ID"]]: idToQuery })
          .expect("Content-Type", /json/)
          .expect(200)
          .expect((res) => {
            const mockSuccessCallback = jest.fn();
            verifyEndpointResponse(res.body, res, endpointObj, mockSuccessCallback)
            expect(mockSuccessCallback.mock.calls.length).toBe(1)
          })
          .end((err, res) => {
            if (err) return done(err.stack);
            return done();
          });
      })
    });
  });

  describe("Fetch a full single user profile", () => {
    const method = "GET";
    const endpointPaths = ["PROFILE", "DETAILS"];
    const endpointObj = { endpointPathKeys: endpointPaths, method }
    const url = endpointURLStr(endpointPaths, method);

    const idToQuery = mockUser[DATA_KEYS["USER_ID"]];

    test(`${method} ${url}`, (done) => {
      signupMockUser(request, app, endpointURLStr, () => {
        request(app)
          .get(url)
          .query({ [DATA_KEYS["USER_ID"]]: idToQuery })
          .expect("Content-Type", /json/)
          .expect(200)
          .expect((res) => {
            const mockSuccessCallback = jest.fn();
            verifyEndpointResponse(res.body, res, endpointObj, mockSuccessCallback)
            expect(mockSuccessCallback.mock.calls.length).toBe(1)
          })
          .end((err, res) => {
            if (err) return done(err.stack);
            return done();
          });
      });
    });
  });

  describe("Update user details", () => {
    const method = "POST";
    const endpointPaths = ["PROFILE", "DETAILS"];
    const endpointObj = { endpointPathKeys: endpointPaths, method }
    const url = endpointURLStr(endpointPaths, method);
    const newUsername = "macdre"
    const body = {
      ...mockUser,
      [DATA_KEYS["USER_NAME"]]: newUsername
    }

    test(`${method} ${url}`, (done) => {
      signupMockUser(request, app, endpointURLStr, () => {
        request(app)
          .post(url)
          .send(body)
          .expect("Content-Type", /json/)
          .expect(201)
          .expect((res) => {
            const mockSuccessCallback = jest.fn();
            verifyEndpointResponse(res.body, res, endpointObj, mockSuccessCallback)
            expect(mockSuccessCallback.mock.calls.length).toBe(1)
            expect(res.body).toBeDefined()
            expect(res.body[DATA_KEYS["USER_PROFILE"]][DATA_KEYS["USER_NAME"]]).toBe(newUsername)
          })
          .end((err, res) => {
            if (err) return done(err.stack);
            return done();
          })
      });
    })
  });

  describe("Delete a user record", () => {
    const method = "DELETE";
    const endpointPaths = ["PROFILE", "DETAILS"];
    const url = endpointURLStr(endpointPaths, method);

    const id = DATA_KEYS["USER_ID"];

    test(`${method} ${url}`, (done) => {
      request(app)
        .delete(url)
        .send({ [id]: mockUser[id] })
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err.stack);
          return done();
        });
    });
  });

});
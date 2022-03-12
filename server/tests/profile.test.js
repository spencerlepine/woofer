const request = require("supertest");

const {
  app,
  constants: {
    endpointURLStr,
    DATA_KEYS
  },
  mockUser,
  signupMockUser,
  verifyEndpointResponse
} = require('./utils/test-helpers');

describe("PROFILE endpoint", () => {

  describe("Fetch a single user profile", () => {
    const method = 'GET';
    const endpointPaths = ['PROFILE'];
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
            expect(verifyEndpointResponse(res.body, endpointPaths, method)).toBe(true)
          })
          .end((err, res) => {
            if (err) return done(err);
            return done();
          });
      })
    });
  });
  /*
    describe("Fetch a full single user profile", () => {
      const method = 'GET';
      const endpointPaths = ['PROFILE', 'DETAILS'];
      const url = endpointURLStr(endpointPaths, method);

      test(`${method} ${url}`, (done) => {
        request(app)
          .get(url)
          .expect("Content-Type", /json/)
          .expect(200)
          .expect((res) => {
            expect(verifyEndpointResponse(res.body, endpointPaths, method)).toBe(true)
          })
          .end((err, res) => {
            if (err) return done(err);
            return done();
          });
      });
    });

    describe("Update user details", () => {
      const method = 'POST';
      const endpointPaths = ['PROFILE', 'DETAILS'];
      const url = endpointURLStr(endpointPaths, method);

      test(`${method} ${url}`, (done) => {
        request(app)
          .post(url)
          .expect("Content-Type", /json/)
          .expect(201)
          .expect((res) => {
            expect(verifyEndpointResponse(res.body, endpointPaths, method)).toBe(true)
          })
          .end((err, res) => {
            if (err) return done(err);
            return done();
          });
      });
    });

    describe("Delete a user record", () => {
      const method = 'DELETE';
      const endpointPaths = ['PROFILE', 'DETAILS'];
      const url = endpointURLStr(endpointPaths, method);

      test(`${method} ${url}`, (done) => {
        request(app)
          .delete(url)
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            return done();
          });
      });
    });
    */
});


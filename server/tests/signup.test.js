const request = require("supertest");

const {
  app,
  constants: {
    endpointURLStr,
  },
  verifyEndpointResponse
} = require('./utils/test-helpers');

describe("SIGNUP endpoint", () => {
  expect(true).toBe(true); // TODO
  /*
  describe("Sign up a user", () => {
    const method = 'POST';
    const endpointPaths = ['SIGNUP'];
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
  */
});

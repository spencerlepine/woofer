const request = require("supertest");

const {
  app,
  constants: {
    endpointURLStr,
  },
  verifyEndpointResponse
} = require('./utils/test-helpers');

describe("SIGNUP endpoint", () => {

  describe("Sign up a user", () => {
    const method = 'POST';
    const endpointPaths = ['SIGNUP'];
    const url = endpointURLStr(endpointPaths, method);

    const reqData = {
      id: 'john124412',
      email: 'johndoe@gmail.com'
    }

    test(`${method} ${url}`, (done) => {
      request(app)
        .post(url)
        .send(reqData)
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });
});

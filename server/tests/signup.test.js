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
      id: 'a11234',
    }

    test(`${method} ${url}`, (done) => {
      request(app)
        .post(url)
        .send({
          id: '123412a',
          email: 'johndoe@gmail.com'
        })
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });
});

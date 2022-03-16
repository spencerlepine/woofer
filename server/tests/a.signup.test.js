const request = require("supertest");

const {
  app,
  constants: {
    endpointURLStr,
  },
  verifyEndpointResponse,
  mockUser,
} = require('./utils/test-helpers');

describe("SIGNUP endpoint", () => {
  const method = 'POST';
  const endpointPaths = ['SIGNUP'];
  const url = endpointURLStr(endpointPaths, method);

  describe("Sign up a user", () => {
    test(`${method} ${url}`, (done) => {
      request(app)
        .post(url)
        .send(mockUser)
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe("Should not create a duplicate user", () => {
    test(`${method} ${url}`, (done) => {
      request(app)
        .post(url)
        .send(mockUser)
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);

          request(app)
            .post(url)
            .send(mockUser)
            .expect("Content-Type", /json/)
            .expect(409)
            .end((err, res) => {
              if (err) return done(err);
              return done();
            });
        });
    });
  });
});

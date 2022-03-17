const request = require("supertest")

const {
  app,
  constants: { endpointURLStr },
  verifyEndpointResponse,
} = require("./utils/test-helpers")

describe("MATCHES endpoint", () => {
  test("TODO", () => {
    expect(true).toBe(true)
  })

  /*
  describe("Generate a match", () => {
    const method = 'GET';
    const endpointPaths = ['MATCHES', 'GENERATE'];
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

  describe("Save user swipe approval/rejection", () => {
    const method = 'POST';
    const endpointPaths = ['MATCHES', 'SWIPE'];
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
          if (err) return done(err);
          return done();
        });
    });
  });
  */
})

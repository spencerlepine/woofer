const request = require("supertest");

const app = require('./utils/test-helpers').app;

describe("Test example", () => {
  test("GET /example/abc", (done) => {
    request(app)
      .get("/api/example/abc")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.body = "The API endpoint worked!"
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
  // More things come here
});

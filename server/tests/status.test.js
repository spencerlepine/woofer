const request = require("supertest")

const { app } = global.testHelpers

describe("STATUS endpoint", () => {
  const url = "/api/status"

  test("GET /status should return running server status", (done) => {
    request(app)
      .get(url)
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined()
        expect(res.body).toHaveProperty("status", "running")
      })
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
})

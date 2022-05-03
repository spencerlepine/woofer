const request = require("supertest")

const { app, mockUser, signupMockUser } = require("../utils/test-helpers")

describe("PROFILE endpoint", () => {
  describe("Fetch a single user profile", () => {
    const url = "/api/profile"
    const query = { userId: mockUser["userId"] }

    test("GET /profile", (done) => {
      signupMockUser(mockUser).then(() => {
        request(app)
          .get(url)
          .query(query)
          .expect("Content-Type", /json/)
          .expect(200)
          .expect((res) => {
            expect(res.body).toBeDefined()
            expect(res.body).toHaveProperty("userProfile")
            const { userProfile } = res.body
            expect(userProfile).toHaveProperty("userId", mockUser["userId"])
          })
          .end((err, res) => {
            if (err) return done(err)
            return done()
          })
      })
    })
  })
})

const request = require("supertest")

const { app, mockUser, signupMockUser } = global.testHelpers

describe("PROFILE endpoint", () => {
  describe("Fetch a complete single user profile", () => {
    const url = "/api/profile/details"
    const query = { userId: mockUser["userId"] }

    test("GET /profile/details", (done) => {
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
            expect(userProfile["chats"]).toEqual(mockUser["chats"])
            expect(userProfile["zipcodes"]).toEqual(mockUser["zipcodes"])
            expect(userProfile["pictures"]).toEqual(mockUser["pictures"])
          })
          .end((err, res) => {
            if (err) return done(err)
            return done()
          })
      })
    })
  })
})

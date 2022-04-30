const request = require("supertest")

const { app, mockUser, signupMockUser } = require("../utils/test-helpers")

describe("PROFILE endpoint", () => {
  describe("Updating a user profile", () => {
    const newUsername = "ligma"

    const url = "/api/profile/details"
    const query = { userId: mockUser["userId"] }

    const updatedProfile = new Object(mockUser)
    updatedProfile["username"] = newUsername

    test("POST /profile/details", (done) => {
      signupMockUser(mockUser).then(() => {
        request(app)
          .post(url)
          .send(updatedProfile)
          .expect("Content-Type", /json/)
          .expect(201)
          .expect((res) => {
            expect(res.body).toBeDefined()
            expect(res.body).toHaveProperty("userProfile")
            const { userProfile } = res.body
            expect(userProfile).toHaveProperty("userId", updatedProfile["userId"])
            expect(userProfile).toHaveProperty("username", newUsername)
          })
          .end((err, res) => {
            if (err) return done(err)
            return done()
          })
      })
    })
  })
})

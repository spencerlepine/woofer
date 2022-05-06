const request = require("supertest")

const { app, mockUser, signupMockUser } = global.testHelpers

const addUserToZipCode = (userId, zipcode) => {
  const method = "POST"
  const url = "/api/zipcodes/add"

  return request(app).post(url).send({
    userId: userId,
    zipcode: zipcode,
  })
}

const testAddZipCode = (url, done) => {
  signupMockUser(mockUser).then(() => {
    request(app)
      .post(url)
      .send({
        userId: mockUser["userId"],
        zipcode: "10001",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .expect((res) => {
        expect(true).toBeTruthy()
        done()
      })
      .catch((err) => done(err))
  })
}

describe("ZIPCODES endpoint", () => {
  describe("Add a zipcode to user record", () => {
    const url = "/api/zipcodes/add"

    test(`POST ${url}`, (done) => {
      testAddZipCode(url, done)
    })
  })

  describe("Delete a zipcode from user record", () => {
    const method = "DELETE"
    const url = "/api/zipcodes/remove"
    const params = {
      ["userId"]: mockUser["userId"],
      zipcode: "10001",
    }

    test(`${method} ${url}`, (done) => {
      signupMockUser(mockUser)
        .then(() => addUserToZipCode(mockUser["userId"], "10001"))
        .then(() => {
          request(app)
            .delete(url)
            .query(params)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err)
              return done()
            })
        })
    })
  })
})

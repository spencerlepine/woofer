const request = require("supertest")

const { app, mockUser } = global.testHelpers

describe("SIGNUP endpoint", () => {
  const method = "POST"
  const url = "/api/signup"

  describe("Sign up a user", () => {
    test(`${method} ${url}`, (done) => {
      request(app)
        .post(url)
        .send(mockUser)
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)
          return done()
        })
    })
  })

  // describe("Should not create a duplicate user", () => {
  //   test(`${method} ${url}`, (done) => {
  //     request(app)
  //       .post(url)
  //       .send(mockUser)
  //       .expect("Content-Type", /json/)
  //       .expect(409)
  //       .end((err, res) => {
  //         if (err) return done(err)

  //         request(app)
  //           .post(url)
  //           .send(mockUser)
  //           .expect("Content-Type", /json/)
  //           .expect(409)
  //           .end((err, res) => {
  //             if (err) return done(err)
  //             return done()
  //           })
  //       })
  //   })
  // })
})

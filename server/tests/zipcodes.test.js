const request = require("supertest")

const {
  app,
  constants: { endpointURLStr, DATA_KEYS },
  mockUser,
  verifyEndpointResponse,
} = require("./utils/test-helpers")

describe("ZIPCODES endpoint", () => {
  describe("Add a zipcode to user record", () => {
    const method = "POST";
    const endpointPaths = ["ZIPCODES", "ADD"];
    const url = endpointURLStr(endpointPaths, method);

    test(`${method} ${url}`, (done) => {
      request(app)
        .post(url)
        .send({
          [DATA_KEYS["USER_ID"]]: mockUser[DATA_KEYS["USER_ID"]],
          [DATA_KEYS["ZIPCODE"]]: "123456"
        })
        .expect("Content-Type", /json/)
        .expect(201)
        .expect((res) => {
          expect(verifyEndpointResponse(res.body, endpointPaths, method)).toBe(true)
        })
        .end((err, res) => {
          if (err) return done(err);
          return done();
        });
    });
  });
  /*
    describe("Delete a zipcode from user record", () => {
      const method = "DELETE";
      const endpointPaths = ["ZIPCODES", "REMOVE"];
      const url = endpointURLStr(endpointPaths, method);

      test(`${method} ${url}`, (done) => {
        request(app)
          .delete(url)
          .expect("Content-Type", /json/)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            return done();
          });
      });
    });
    */
})

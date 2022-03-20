const request = require("supertest")

const addUserToZipcodePool = require("../src/controllers/controllerHelpers/zipcodes/addUserToZipcodePool")

const {
  app,
  constants: { endpointURLStr, DATA_KEYS },
  mockUser,
  mockUserB,
  verifyEndpointResponse,
  signupMockUser,
} = require("./utils/test-helpers")

const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
  setHeader: jest.fn(),
  end: jest.fn((r) => r),
}
const zipcode = "10001"
const idKey = DATA_KEYS["USER_ID"]
const thisUserId = mockUser[idKey]
const thatUserId = mockUserB[idKey]

describe("MATCHES endpoint", () => {
  // describe("Generate a match", () => {
  //   const method = "GET"
  //   const endpointPaths = ["MATCHES", "GENERATE"]
  //   const endpointObj = { endpointPathKeys: endpointPaths, method }
  //   const url = endpointURLStr(endpointPaths, method)

  //   test(`${method} ${url}`, (done) => {
  //     signupMockUser(mockUser)
  //       .then(() => addUserToZipcodePool(res, zipcode, thatUserId))
  //       .then(() => addUserToZipcodePool(res, zipcode, thatUserId))
  //       .then(() => {
  //         request(app)
  //           .get(url)
  //           .send({ [DATA_KEYS["USER_ID"]]: mockUser[DATA_KEYS["USER_ID"]] })
  //           .expect("Content-Type", /json/)
  //           .expect(200)
  //           .expect((res) => {
  //             const mockSuccessCallback = jest.fn()
  //             verifyEndpointResponse(res.body, res, endpointObj, mockSuccessCallback)
  //             expect(mockSuccessCallback.mock.calls.length).toBe(1)
  //           })
  //           .end((err, res) => {
  //             if (err) return done(err.stack)
  //             return done()
  //           })
  //       })
  //       .catch((err) => done(err))
  //   })
  // })

  describe("Save user swipe approval", () => {
    const method = "POST";
    const endpointPaths = ["MATCHES", "SWIPE"];
    const url = endpointURLStr(endpointPaths, method);
    const swipe = DATA_KEYS["MATCH_ACCEPT"]
    const body = {
      [DATA_KEYS["THIS_USER_ID"]]: thisUserId,
      [DATA_KEYS["THAT_USER_ID"]]: thatUserId,
      [DATA_KEYS["MATCH_STATUS"]]: swipe,
    }

    test(`${method} ${url}`, (done) => {
      const testArrange = Promise.all([
        signupMockUser(mockUser),
        signupMockUser(mockUserB),
      ])


      testArrange
        .then(() => {
          request(app)
            .post(url)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(201)
            .expect((result) => {
              expect(result).toBeDefined()
              const resBody = result.body
              expect([DATA_KEYS["USER_PROFILE"]] in resBody).toBeTruthy()
              expect([DATA_KEYS["CHAT_ID"]] in resBody).toBeTruthy()
            })
            .end((err, res) => {
              if (err) return done(err.stack);
              return done();
            });
        })
    });
  });

  describe("Save user swipe rejection", () => {
    const method = "POST";
    const endpointPaths = ["MATCHES", "SWIPE"];
    const url = endpointURLStr(endpointPaths, method);
    const swipe = DATA_KEYS["MATCH_REJECT"]
    const body = {
      [DATA_KEYS["THIS_USER_ID"]]: thisUserId,
      [DATA_KEYS["THAT_USER_ID"]]: thatUserId,
      [DATA_KEYS["MATCH_STATUS"]]: swipe,
    }

    test(`${method} ${url}`, (done) => {
      const testArrange = Promise.all([
        signupMockUser(mockUser),
        signupMockUser(mockUserB),
      ])

      testArrange
        .then(() => {
          request(app)
            .post(url)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(201)
            .expect((result) => {
              expect(result).toBeDefined()
              const resBody = result.body
              expect([DATA_KEYS["USER_PROFILE"]] in resBody).toBeTruthy()
              expect([DATA_KEYS["CHAT_ID"]] in resBody).toBeTruthy()
            })
            .end((err, res) => {
              if (err) return done(err.stack);
              return done();
            });
        })
    });
  });
})

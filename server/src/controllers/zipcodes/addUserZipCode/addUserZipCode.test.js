const { mockUser, mockUserB, signupMockUser, mockRes } = global.testHelpers

const { getModelDocumentById } = require("../../../models/modelHelpers")

const addUserZipCode = require("./index")

describe("addUserZipCode controller", () => {
  describe("with invalid arguments", () => {
    const invalidReq = {}

    test("should return a promise", () => {
      const result = addUserZipCode(invalidReq, mockRes)
      expect(result.constructor).toBe(Promise)
    })

    test("should not throw an error with invalid arguments", (done) => {
      addUserZipCode(invalidReq, mockRes)
        .catch((err) => {
          expect(err).not.toBeTruthy()
          done(err)
        })
        .then(() => {
          done()
        })
    })

    test("should resolve with no error given invalid arguments", (done) => {
      const mockResolve = {
        status: () => ({
          json: (response) => {
            expect(response).toBeDefined()
            expect(response).not.toHaveProperty("error")
            done()
          },
        }),
      }

      const invalidIdReq = {
        query: {
          userId: "nonexistent",
          zipcode: "10001",
        },
      }

      addUserZipCode(invalidIdReq, mockResolve).catch(done)
    })
  })

  describe("with valid arguments", () => {
    const mockReq = {
      query: {
        userId: mockUser["userId"],
        zipcode: "10001",
      },
    }

    test("should udpate user profile", (done) => {
      const mockResolve = {
        status: (statusCode) => ({
          json: (response) => {
            expect(response).toBeDefined()
            expect(statusCode).toBe(201)
          },
        }),
      }

      signupMockUser(mockUser)
        .then(() => {
          return addUserZipCode(mockReq, mockResolve)
        })
        .then(() => getModelDocumentById("DogUser", "userId", mockUser["userId"]))
        .then((userProfile) => {
          expect(userProfile["zipcodes"]).toEqual(["10001"])
        })
        .then(() => getModelDocumentById("ZipcodePool", "zipcodeId", "10001"))
        .then((zipcodePoolRecord) => {
          expect(zipcodePoolRecord).toHaveProperty("zipcodeUsers")
          expect(zipcodePoolRecord["zipcodeUsers"]).toHaveProperty(
            mockUser["userId"],
            1
          )
          done()
        })
        .catch(done)
    })
  })
})

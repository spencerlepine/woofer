const { mockUser, mockUserB, signupMockUser, modelHelpers } = global.testHelpers

const { getModelDocumentById } = require("../../../models/modelHelpers")

const addZipCodeToProfile = require("./index")

describe("addZipCodeToProfile controller helper", () => {
  describe("with invalid arguments", () => {
    test("should return a promise", () => {
      const result = addZipCodeToProfile()
      expect(result.constructor).toBe(Promise)
    })

    test("should throw an error with invalid arguments", (done) => {
      addZipCodeToProfile()
        .catch((err) => {
          expect(err).toBeTruthy()
          done(err)
        })
        .then(() => {
          done()
        })
    })
  })

  describe("with valid arguments", () => {
    const userId = mockUser["userId"]
    const zipcode = "10001"

    test("should resolve with updated user profile", (done) => {
      signupMockUser(mockUser)
        .then(() => addZipCodeToProfile(userId, zipcode))
        .then((userProfile) => {
          expect(userProfile).toBeDefined()
          expect(userProfile).toHaveProperty("zipcodes")
          const { zipcodes } = userProfile
          expect(zipcodes).toEqual([zipcode])
          done()
        })
        .catch(done)
    })
  })
})

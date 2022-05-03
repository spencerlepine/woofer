const { mockUser, mockUserB, signupMockUser, modelHelpers } = global.testHelpers

const { getModelDocumentById } = require("../../../models/modelHelpers")

const removeZipCodeFromProfile = require("./index")
const userToZipPoolDoc = require("../userToZipPoolDoc")

describe("removeZipCodeFromProfile controller helper", () => {
  describe("with invalid arguments", () => {
    test("should return a promise", () => {
      const result = removeZipCodeFromProfile()
      expect(result.constructor).toBe(Promise)
    })

    test("should throw an error with invalid arguments", (done) => {
      removeZipCodeFromProfile()
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
    const user = Object.create(mockUser)
    user["zipcodes"] = ["10001"]
    const zipcode = "10001"

    test("should resolve with updated user profile", (done) => {
      signupMockUser(user)
        .then(() => userToZipPoolDoc(user["userId"], zipcode))
        .then(() => removeZipCodeFromProfile(user["userId"], zipcode))
        .then((userProfile) => {
          console.log(userProfile)
          expect(userProfile).toBeDefined()
          expect(userProfile).toHaveProperty("zipcodes")
          const { zipcodes } = userProfile
          expect(zipcodes).toEqual([])
          done()
        })
        .catch(done)
    })
  })
})

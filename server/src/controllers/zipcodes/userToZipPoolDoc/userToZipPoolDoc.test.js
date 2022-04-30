const { mockUser, mockUserB, signupMockUser, modelHelpers } = global.testHelpers

const { getModelDocumentById } = require("../../../models/modelHelpers")

const userToZipPoolDoc = require("./index")

describe("userToZipPoolDoc controller helper", () => {
  describe("with invalid arguments", () => {
    test("should return a promise", () => {
      const result = userToZipPoolDoc()
      expect(result.constructor).toBe(Promise)
    })

    test("should throw an error with invalid arguments", (done) => {
      userToZipPoolDoc()
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
        .then(() => userToZipPoolDoc(userId, zipcode))
        .then((updatedPool) => {
          expect(updatedPool).toBeDefined()
          expect(updatedPool).toHaveProperty("zipcodeUsers")
          const { zipcodeUsers } = updatedPool
          expect(zipcodeUsers[userId]).toBeTruthy()
        })
        .then(() => getModelDocumentById("DogUser", "userId", userId))
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

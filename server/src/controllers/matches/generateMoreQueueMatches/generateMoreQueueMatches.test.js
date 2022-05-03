const { mockUser, mockUserB, signupMockUser, modelHelpers } = global.testHelpers

const generateMoreQueueMatches = require("./index")
const userToZipPoolDoc = require("../../zipcodes/userToZipPoolDoc")

describe("generateMoreQueueMatches controller helper", () => {
  // describe("with invalid arguments", () => {
  //   test("should return a promise", () => {
  //     const result = generateMoreQueueMatches()
  //     expect(result.constructor).toBe(Promise)
  //   })

  //   test("should throw an error with invalid arguments", (done) => {
  //     generateMoreQueueMatches()
  //       .catch((err) => {
  //         expect(err).toBeTruthy()
  //         done(err)
  //       })
  //       .then(() => {
  //         done()
  //       })
  //   })
  // })

  describe("with valid arguments", () => {
    const userId = mockUser["userId"]

    test("should produce list of userIds given populated zipcode pool", (done) => {
      const zipcode = "10001"
      const mockUserC = Object.create(mockUser)
      mockUserC["userId"] = "C"
      mockUserC["gender"] = mockUser["preference"]
      mockUserC["preference"] = mockUser["gender"]
      const mockUserD = Object.create(mockUser)
      mockUserD["userId"] = "D"
      mockUserD["gender"] = mockUser["preference"]
      mockUserD["preference"] = mockUser["gender"]
      const mockUserE = Object.create(mockUser)
      mockUserE["userId"] = "E"
      mockUserE["gender"] = mockUser["preference"]
      mockUserE["preference"] = mockUser["gender"]
      const mockUserF = Object.create(mockUser)
      mockUserF["userId"] = "F"
      mockUserF["gender"] = mockUser["preference"]
      mockUserF["preference"] = mockUser["gender"]
      const mockUserG = Object.create(mockUser)
      mockUserG["userId"] = "G"
      mockUserG["gender"] = mockUser["preference"]
      mockUserG["preference"] = mockUser["gender"]

      signupMockUser(mockUser)
        .then(() => userToZipPoolDoc(mockUser["userId"], zipcode))
        .then(() => signupMockUser(mockUserC))
        .then(() => userToZipPoolDoc(mockUserC["userId"], zipcode))
        .then(() => signupMockUser(mockUserD))
        .then(() => userToZipPoolDoc(mockUserD["userId"], zipcode))
        .then(() => signupMockUser(mockUserF))
        .then(() => userToZipPoolDoc(mockUserF["userId"], zipcode))
        .then(() => signupMockUser(mockUserG))
        .then(() => userToZipPoolDoc(mockUserG["userId"], zipcode))
        .then(() => generateMoreQueueMatches(mockUser["userId"]))
        .then((result) => {
          expect(result).toBeDefined()
          expect(result).toHaveProperty("matchQueue")
          const { matchQueue } = result
          expect(Array.isArray(matchQueue)).toBeTruthy()
          expect(matchQueue.length > 0).toBeTruthy()
          done()
        })
        .catch(done)
    })
  })
})

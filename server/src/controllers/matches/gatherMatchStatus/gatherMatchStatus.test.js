const { mockUser, mockUserB, signupMockUser, modelHelpers } = global.testHelpers

const generateMatchStatus = require("./index")
const updateSwipeRecord = require("../updateSwipeRecord")

describe("generateMatchStatus controller helper", () => {
  describe("with invalid arguments", () => {
    test("should return a promise", () => {
      const result = generateMatchStatus()
      expect(result.constructor).toBe(Promise)
    })

    test("should throw an error with invalid arguments", (done) => {
      generateMatchStatus()
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
    const thisUserId = mockUser["userId"]
    const thatUserId = mockUserB["userId"]

    test("should resolve with user match status", (done) => {
      signupMockUser(mockUser)
        .then(() => signupMockUser(mockUserB))
        .then(() => generateMatchStatus(thisUserId, thatUserId))
        .then((userProfile) => {
          expect(userProfile).toBeDefined()
          expect(userProfile).toHaveProperty(thisUserId, "none")
          expect(userProfile).toHaveProperty(thatUserId, "none")
          done()
        })
        .catch(done)
    })

    test("should resolve with user mutual match status", (done) => {
      signupMockUser(mockUser)
        .then(() => signupMockUser(mockUserB))
        .then(() =>
          updateSwipeRecord(mockUser["userId"], mockUserB["userId"], "accept")
        )
        .then(() =>
          updateSwipeRecord(mockUserB["userId"], mockUser["userId"], "accept")
        )
        .then(() => generateMatchStatus(thisUserId, thatUserId))
        .then((userProfile) => {
          expect(userProfile).toBeDefined()
          expect(userProfile).toHaveProperty(thisUserId, "accept")
          expect(userProfile).toHaveProperty(thatUserId, "accept")
          done()
        })
        .catch(done)
    })

    test("should resolve with user one way match status", (done) => {
      signupMockUser(mockUser)
        .then(() => signupMockUser(mockUserB))
        .then(() => updateSwipeRecord(thisUserId, thatUserId, "reject"))
        .then(() => updateSwipeRecord(thatUserId, thisUserId, "accept"))
        .then(() => generateMatchStatus(thisUserId, thatUserId))
        .then((userProfile) => {
          expect(userProfile).toBeDefined()
          expect(userProfile).toHaveProperty(thisUserId, "reject")
          expect(userProfile).toHaveProperty(thatUserId, "accept")
          done()
        })
        .catch(done)
    })

    test("should resolve with user one way match status", (done) => {
      signupMockUser(mockUser)
        .then(() => signupMockUser(mockUserB))
        .then(() => updateSwipeRecord(thisUserId, thatUserId, "accept"))
        .then(() => updateSwipeRecord(thatUserId, thisUserId, "reject"))
        .then(() => generateMatchStatus(thisUserId, thatUserId))
        .then((userProfile) => {
          expect(userProfile).toBeDefined()
          expect(userProfile).toHaveProperty(thisUserId, "accept")
          expect(userProfile).toHaveProperty(thatUserId, "reject")
          done()
        })
        .catch(done)
    })
  })
})

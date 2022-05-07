const request = require("supertest")
const {
  signupMockUser,
  modelHelpers: { getModelDocumentById },
} = global.testHelpers

const getMatchStatus = require("./helpers/getMatchStatus")
const getUserMatchQueue = require("./helpers/getUserMatchQueue")
const addUserToZipcode = require("./helpers/addUserToZipcode")
const swipeOnUser = require("./helpers/swipeOnUser")
const generatePossibleMatch = require("./helpers/generatePossibleMatch")
const getUserProfile = (userId) => getModelDocumentById("DogUser", "userId", userId)
const MaleDog = require("./helpers/MaleDog")
const FemaleDog = require("./helpers/FemaleDog")

const maleDogId = MaleDog["userId"]
const femaleDogId = FemaleDog["userId"]
const testZipcode = "10001"
const ACCEPT = "accept"
const REJECT = "reject"
const NO_CHOICE = "none"

const testArrangement = () => {
  return signupMockUser(MaleDog)
    .then(() => signupMockUser(FemaleDog))
    .then(() => addUserToZipcode(maleDogId, testZipcode))
    .then(() => addUserToZipcode(femaleDogId, testZipcode))
}

describe("Test Arrangement", () => {
  test("should create MaleDog record", (done) => {
    testArrangement()
      .then(() => getModelDocumentById("DogUser", "userId", maleDogId))
      .then((userProfile) => {
        expect(userProfile).toBeDefined()
        expect(userProfile).toHaveProperty("userId", maleDogId)
        expect(userProfile).toHaveProperty("zipcodes")
        const { zipcodes } = userProfile
        expect(Array.isArray(zipcodes)).toBeTruthy()
        expect(zipcodes).toContain(testZipcode)
        done()
      })
      .catch((err) => done(err))
  })

  test("should create FemaleDog record", (done) => {
    testArrangement()
      .then(() => getModelDocumentById("DogUser", "userId", femaleDogId))
      .then((userProfile) => {
        expect(userProfile).toBeDefined()
        expect(userProfile).toHaveProperty("userId", femaleDogId)
        expect(userProfile).toHaveProperty("zipcodes")
        const { zipcodes } = userProfile
        expect(Array.isArray(zipcodes)).toBeTruthy()
        expect(zipcodes).toContain(testZipcode)
        done()
      })
      .catch((err) => done(err))
  })

  test("should save both users in Zipcode record", (done) => {
    testArrangement()
      .then(() => getModelDocumentById("ZipcodePool", "zipcodeId", testZipcode))
      .then((zipcodeRecord) => {
        expect(zipcodeRecord).toBeDefined()
        expect(zipcodeRecord).toHaveProperty("zipcodeUsers")
        const { zipcodeUsers } = zipcodeRecord
        expect(zipcodeUsers).toBeDefined()
        expect(zipcodeUsers).toHaveProperty(maleDogId, 1)
        expect(zipcodeUsers).toHaveProperty(femaleDogId, 1)
        done()
      })
      .catch((err) => done(err))
  })
})

describe("When Users have same ZipCode/Preferences", () => {
  test("should generate FemaleDog as possible match for MaleDog", (done) => {
    testArrangement()
      .then(() => generatePossibleMatch(maleDogId))
      .then((possibleMatch) => {
        const { userProfile } = possibleMatch
        expect(userProfile).toBeTruthy()
        expect(userProfile).toHaveProperty("userId", femaleDogId)
        done()
      })
      .catch((err) => done(err))
  })

  test("should generate MaleDog as possible match for FemaleDog", (done) => {
    testArrangement()
      .then(() => generatePossibleMatch(femaleDogId))
      .then((possibleMatch) => {
        const { userProfile } = possibleMatch
        expect(userProfile).toBeTruthy()
        expect(userProfile).toHaveProperty("userId", maleDogId)
        done()
      })
      .catch((err) => done(err))
  })
})

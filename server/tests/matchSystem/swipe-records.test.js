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

describe("When Users swipe on eachother", () => {
  test("should record choice when DogMale swipes YES on FemaleDog", (done) => {
    testArrangement()
      .then(() => swipeOnUser(maleDogId, femaleDogId, ACCEPT))
      .then(() => getMatchStatus(maleDogId, femaleDogId))
      .then((userMatches) => {
        const { [maleDogId]: maleSwipeChoice, [femaleDogId]: femaleSwipeChoice } =
          userMatches

        expect(maleSwipeChoice).toBe(ACCEPT)
        expect(femaleSwipeChoice).toBe(NO_CHOICE)
        done()
      })
      .catch((err) => done(err))
  })

  test("should record choice when DogMale swipes NO on FemaleDog", (done) => {
    testArrangement()
      .then(() => swipeOnUser(maleDogId, femaleDogId, REJECT))
      .then(() => getMatchStatus(maleDogId, femaleDogId))
      .then((userMatches) => {
        const { [maleDogId]: maleSwipeChoice, [femaleDogId]: femaleSwipeChoice } =
          userMatches

        expect(maleSwipeChoice).toBe(REJECT)
        expect(femaleSwipeChoice).toBe(NO_CHOICE)
        done()
      })
      .catch((err) => done(err))
  })

  test("should record choice mutual YES swipe for each user", (done) => {
    testArrangement()
      .then(() => swipeOnUser(maleDogId, femaleDogId, ACCEPT))
      .then(() => swipeOnUser(femaleDogId, maleDogId, ACCEPT))
      .then(() => getMatchStatus(maleDogId, femaleDogId))
      .then((userMatches) => {
        const { [maleDogId]: maleSwipeChoice, [femaleDogId]: femaleSwipeChoice } =
          userMatches

        expect(maleSwipeChoice).toBe(ACCEPT)
        expect(femaleSwipeChoice).toBe(ACCEPT)
        done()
      })
      .catch((err) => done(err))
  })

  test("should record choice mutual YES and NO swipe for each user", (done) => {
    testArrangement()
      .then(() => swipeOnUser(maleDogId, femaleDogId, ACCEPT))
      .then(() => swipeOnUser(femaleDogId, maleDogId, REJECT))
      .then(() => getMatchStatus(maleDogId, femaleDogId))
      .then((userMatches) => {
        const { [maleDogId]: maleSwipeChoice, [femaleDogId]: femaleSwipeChoice } =
          userMatches

        expect(maleSwipeChoice).toBe(ACCEPT)
        expect(femaleSwipeChoice).toBe(REJECT)
        done()
      })
      .catch((err) => done(err))
  })

  test("should record choice mutual NO and YES swipe for each user", (done) => {
    testArrangement()
      .then(() => swipeOnUser(maleDogId, femaleDogId, REJECT))
      .then(() => swipeOnUser(femaleDogId, maleDogId, ACCEPT))
      .then(() => getMatchStatus(maleDogId, femaleDogId))
      .then((userMatches) => {
        const { [maleDogId]: maleSwipeChoice, [femaleDogId]: femaleSwipeChoice } =
          userMatches

        expect(maleSwipeChoice).toBe(REJECT)
        expect(femaleSwipeChoice).toBe(ACCEPT)
        done()
      })
      .catch((err) => done(err))
  })
})

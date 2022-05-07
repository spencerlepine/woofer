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

describe("Handling User Match Queues", () => {
  test("should add MaleDog to FemaleDog (after MaleDog YES Swipe)", (done) => {
    testArrangement()
      .then(() => swipeOnUser(maleDogId, femaleDogId, ACCEPT))
      .then(() => getUserMatchQueue(femaleDogId))
      .then((matchQueueRecord) => {
        const { matchQueue } = matchQueueRecord
        expect(matchQueue).toBeTruthy()
        expect(Array.isArray(matchQueue)).toBeTruthy()
        expect(matchQueue).not.toContain(femaleDogId)
        expect(matchQueue).toContain(maleDogId)
        done()
      })
      .catch((err) => done(err))
  })

  test("should remove both users from match queue with mutual YES swipe", (done) => {
    testArrangement()
      .then(() => swipeOnUser(maleDogId, femaleDogId, ACCEPT))
      .then(() => swipeOnUser(femaleDogId, maleDogId, ACCEPT))
      .then(() => getUserMatchQueue(femaleDogId))
      .then((matchQueueRecord) => {
        const { matchQueue } = matchQueueRecord
        expect(matchQueue).toBeTruthy()
        expect(Array.isArray(matchQueue)).toBeTruthy()
        expect(matchQueue).not.toContain(femaleDogId)
        expect(matchQueue).not.toContain(maleDogId)
      })
      .then(() => getUserMatchQueue(maleDogId))
      .then((matchQueueRecord) => {
        // Did not need to create MatchRecord yet
        if (matchQueueRecord && matchQueueRecord["matchQueue"]) {
          const { matchQueue } = matchQueueRecord
          expect(matchQueue).toBeTruthy()
          expect(Array.isArray(matchQueue)).toBeTruthy()
          expect(matchQueue).not.toContain(femaleDogId)
          expect(matchQueue).not.toContain(maleDogId)
        } else {
          expect(matchQueueRecord && matchQueueRecord["matchQueue"]).toBeFalsy()
        }
        done()
      })
      .catch((err) => done(err))
  })
})

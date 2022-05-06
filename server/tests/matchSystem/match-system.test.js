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

describe("Validate Woofer Matching system", () => {
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

  describe("Handling Mutual User YES swipes", () => {
    test("should generate a chatId on mutual swipe", (done) => {
      testArrangement()
        .then(() => swipeOnUser(maleDogId, femaleDogId, ACCEPT))
        .then(() => swipeOnUser(femaleDogId, maleDogId, ACCEPT))
        .then((swipeResult) => {
          expect(swipeResult).toHaveProperty("chatId")
          expect(swipeResult).toHaveProperty("userProfile")
          const { chatId, userProfile } = swipeResult
          expect(typeof chatId).toBe("string")
          expect(chatId).toBeTruthy()
          expect(chatId).not.toBe("none")
          done()
        })
        .catch((err) => done(err))
    })

    test("should not generate a chatId on one YES swipe", (done) => {
      testArrangement()
        .then(() => swipeOnUser(maleDogId, femaleDogId, ACCEPT))
        .then(() => swipeOnUser(femaleDogId, maleDogId, REJECT))
        .then((swipeResult) => {
          expect(swipeResult).toHaveProperty("chatId")
          expect(swipeResult).toHaveProperty("userProfile")
          const { chatId, userProfile } = swipeResult
          expect(typeof chatId).toBe("string")
          expect(chatId).toBeTruthy()
          expect(chatId).toBe("none")
          done()
        })
        .catch((err) => done(err))
    })

    test("should find chatId in user profiles after mutual swipe", (done) => {
      testArrangement()
        .then(() => swipeOnUser(maleDogId, femaleDogId, ACCEPT))
        .then(() => swipeOnUser(femaleDogId, maleDogId, ACCEPT))
        .then(() => getUserProfile(maleDogId))
        .then((userProfile) => {
          expect(userProfile).toBeDefined()
          expect(userProfile).toHaveProperty("userId", maleDogId)
          expect(userProfile).toHaveProperty("chats")
          const { chats } = userProfile
          expect(chats).toBeTruthy()
          console.log(chats)
          expect(Array.isArray(chats)).toBeTruthy()
          expect(chats.length).toBe(1)
        })
        .then(() => getUserProfile(femaleDogId))
        .then((userProfile) => {
          expect(userProfile).toBeDefined()
          expect(userProfile).toHaveProperty("userId", femaleDogId)
          expect(userProfile).toHaveProperty("chats")
          const { chats } = userProfile
          expect(chats).toBeTruthy()
          expect(Array.isArray(chats)).toBeTruthy()
          expect(chats.length).toBe(1)
          done()
        })
        .catch((err) => done(err))
    })

    test("should NOT find chatId in user profiles without mutual swipe", (done) => {
      testArrangement()
        .then(() => swipeOnUser(femaleDogId, femaleDogId, ACCEPT))
        .then(() => swipeOnUser(maleDogId, maleDogId, REJECT))
        .then(() => getUserProfile(maleDogId))
        .then((userProfile) => {
          expect(userProfile).toBeDefined()
          expect(userProfile).toHaveProperty("userId", maleDogId)
          expect(userProfile).toHaveProperty("chats")
          const { chats } = userProfile
          expect(chats).toBeTruthy()
          expect(Array.isArray(chats)).toBeTruthy()
          expect(chats.length).toBe(0)
        })
        .then(() => getUserProfile(femaleDogId))
        .then((userProfile) => {
          expect(userProfile).toBeDefined()
          expect(userProfile).toHaveProperty("userId", femaleDogId)
          expect(userProfile).toHaveProperty("chats")
          const { chats } = userProfile
          expect(chats).toBeTruthy()
          expect(Array.isArray(chats)).toBeTruthy()
          expect(chats.length).toBe(0)
          done()
        })
        .catch((err) => done(err))
    })
  })
})

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

  // describe("Test Arrangement", () => {
  //   test("should create MaleDog record", (done) => {
  //     testArrangement()
  //       .then(() => getModelDocumentById("DogUser", "userId", maleDogId))
  //       .then((userProfile) => {
  //         expect(userProfile).toBeDefined()
  //         expect(userProfile).toHaveProperty("userId", maleDogId)
  //         expect(userProfile).toHaveProperty("zipcodes")
  //         const { zipcodes } = userProfile
  //         expect(Array.isArray(zipcodes)).toBeTruthy()
  //         expect(zipcodes).toContain(testZipcode)
  //         done()
  //       })
  //       .catch((err) => done(err))
  //   })

  //   test("should create FemaleDog record", (done) => {
  //     testArrangement()
  //       .then(() => getModelDocumentById("DogUser", "userId", femaleDogId))
  //       .then((userProfile) => {
  //         expect(userProfile).toBeDefined()
  //         expect(userProfile).toHaveProperty("userId", femaleDogId)
  //         expect(userProfile).toHaveProperty("zipcodes")
  //         const { zipcodes } = userProfile
  //         expect(Array.isArray(zipcodes)).toBeTruthy()
  //         expect(zipcodes).toContain(testZipcode)
  //         done()
  //       })
  //       .catch((err) => done(err))
  //   })
  // })

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

  /*
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
        .then(() => swipeOnUser(maleDogId, femaleDogId, ACCEPT))
        .then(() => getUserProfile(maleDogId))
        .then((userProfile) => {
          expect(userProfile).toBeDefined()
          expect(userProfile).toHaveProperty("userId", maleDogId)
          expect(userProfile).toHaveProperty("chats")
          const { chats } = userProfile
          expect(chats).toBeTruthy()
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
        .then(() => swipeOnUser(maleDogId, femaleDogId, ACCEPT))
        .then(() => swipeOnUser(maleDogId, femaleDogId, REJECT))
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
    */
})

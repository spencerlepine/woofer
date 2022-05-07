const request = require("supertest")
const {
  signupMockUser,
  modelHelpers: { getModelDocumentById },
} = global.testHelpers

const generateRandomDog = require("./helpers/generateRandomDog")
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

describe("Handling Many Users in Match Queues", () => {
  const dogA = generateRandomDog()
  const dogB = generateRandomDog()
  const dogC = generateRandomDog()
  const dogD = generateRandomDog()
  console.log(dogA)

  test("should add users to user match queue", (done) => {
    return signupMockUser(dogA)
      .then(() => signupMockUser(dogB))
      .then(() => signupMockUser(dogC))
      .then(() => signupMockUser(dogD))
      .then(() => swipeOnUser(dogB.userId, dogA.userId, ACCEPT))
      .then(() => swipeOnUser(dogC.userId, dogA.userId, ACCEPT))
      .then(() => swipeOnUser(dogD.userId, dogA.userId, ACCEPT))
      .then(() => getUserMatchQueue(dogA.userId))
      .then((matchQueueRecord) => {
        const { matchQueue } = matchQueueRecord
        expect(matchQueue).toBeTruthy()
        expect(Array.isArray(matchQueue)).toBeTruthy()
        expect(matchQueue).toContain(dogB.userId)
        expect(matchQueue).toContain(dogC.userId)
        expect(matchQueue).toContain(dogD.userId)
        done()
      })
  })
})

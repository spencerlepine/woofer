const { mockUser, mockUserB, signupMockUser } = global.testHelpers
const { getModelDocumentById } = require("../../../models/modelHelpers")

const removeUserFromChat = require("./index")
const addUserToChat = require("../addUserToChat")

describe("removeUserFromChat controller helper", () => {
  describe("with invalid arguments", () => {
    test("should return a promise", () => {
      const result = removeUserFromChat()
      expect(result.constructor).toBe(Promise)
    })

    test("should throw an error with invalid arguments", (done) => {
      removeUserFromChat()
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
    const mockChatId = "abc123jkl"

    test("should resolve user profile without chat id", (done) => {
      signupMockUser(mockUser)
        .then(() => signupMockUser(mockUserB))
        .then(() =>
          addUserToChat(mockChatId, mockUser["userId"], mockUserB["userId"])
        )
        .then(() => removeUserFromChat(mockChatId, mockUser["userId"]))
        .then((userProfile) => {
          expect(userProfile).toBeDefined()
          expect(userProfile).toHaveProperty("chats")
          expect(userProfile["chats"]).toEqual([])
        })
        .then(() => getModelDocumentById("DogUser", "userId", mockUser["userId"]))
        .then((userProfile) => {
          expect(userProfile).toBeDefined()
          expect(userProfile).toHaveProperty("userId", mockUser["userId"])
          expect(userProfile).toHaveProperty("chats")
          const { chats } = userProfile
          expect(Array.isArray(chats)).toBeTruthy()
          expect(chats.length).toBe(0)
          done()
        })
        .catch(done)
    })
  })
})

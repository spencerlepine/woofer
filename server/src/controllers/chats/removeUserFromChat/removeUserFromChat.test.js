const { mockUser, mockUserB, signupMockUser } = global.testHelpers

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

    test("should resolve updated user profile", (done) => {
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
          done()
        })
        .catch(done)
    })
  })
})

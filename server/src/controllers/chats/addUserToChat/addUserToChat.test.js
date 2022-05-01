const { mockUser, mockUserB, signupMockUser, modelHelpers } = global.testHelpers

const addUserToChat = require("./index")

describe("addUserToChat controller helper", () => {
  describe("with invalid arguments", () => {
    test("should return a promise", () => {
      const result = addUserToChat()
      expect(result.constructor).toBe(Promise)
    })

    test("should throw an error with invalid arguments", (done) => {
      addUserToChat()
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
        .then((userProfile) => {
          expect(userProfile).toBeDefined()
          expect(userProfile).toHaveProperty("chats")
          expect(userProfile["chats"]).toEqual([
            {
              chatId: mockChatId,
              otherUserId: mockUserB["userId"],
            },
          ])
          done()
        })
        .catch(done)
    })
  })
})

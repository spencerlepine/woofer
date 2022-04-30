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
    const user = {
      ...mockUser,
      userId: mockChatId,
      chats: [
        {
          chatId: mockChatId,
          otherUserId: mockUserB["userId"],
        },
      ],
    }

    test("should resolve updated user profile", (done) => {
      signupMockUser(user)
        .then(() => signupMockUser(mockUserB))
        .then(() => addUserToChat(mockChatId, user["userId"], mockUserB["userId"]))
        .then(() => removeUserFromChat(mockChatId, user["userId"]))
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

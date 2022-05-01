const { mockUser, mockUserB, signupMockUser, modelHelpers } = global.testHelpers

const gatherChatHistory = require("./index")
const saveMessageToChatHistory = require("../saveMessageToChatHistory")

describe("gatherChatHistory controller helper", () => {
  describe("with invalid arguments", () => {
    test("should return a promise", () => {
      const result = gatherChatHistory()
      expect(result.constructor).toBe(Promise)
    })

    test("should throw an error with invalid arguments", (done) => {
      gatherChatHistory()
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
    const mockMessage = {
      messageId: "91234104",
      user: {
        userId: mockUser["userId"],
        name: mockUser["username"],
      },
      value: "This is a test message!",
      time: Date.now(),
    }

    test("should resolve with user match status", (done) => {
      signupMockUser(mockUser)
        .then(() => signupMockUser(mockUserB))
        .then(() => saveMessageToChatHistory(mockChatId, mockMessage))
        .then(() => saveMessageToChatHistory(mockChatId, mockMessage))
        .then(() => saveMessageToChatHistory(mockChatId, mockMessage))
        .then(() => gatherChatHistory(mockChatId))
        .then((chatRecordDoc) => {
          expect(chatRecordDoc).toBeDefined()
          expect(chatRecordDoc).toHaveProperty("chatId", mockChatId)
          expect(chatRecordDoc).toHaveProperty("chatMessages")
          const { chatMessages } = chatRecordDoc
          expect(Array.isArray(chatMessages)).toBeTruthy()
          expect(chatMessages.length).toBe(3)
          done()
        })
        .catch(done)
    })
  })
})

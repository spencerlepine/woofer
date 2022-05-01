const { mockUser, mockUserB, signupMockUser } = global.testHelpers

const { createModelDocumentById } = require("../../../models/modelHelpers")

const saveMessageToChatHistory = require("./index")
const addUserToChat = require("../addUserToChat")

describe("saveMessageToChatHistory controller helper", () => {
  describe("with invalid arguments", () => {
    test("should return a promise", () => {
      const result = saveMessageToChatHistory()
      expect(result.constructor).toBe(Promise)
    })

    test("should throw an error with invalid arguments", (done) => {
      saveMessageToChatHistory()
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

    test("should add message to chat document", (done) => {
      signupMockUser(mockUser)
        .then(() => signupMockUser(mockUserB))
        .then(() =>
          addUserToChat(mockChatId, mockUser["userId"], mockUserB["userId"])
        )
        .then(() =>
          addUserToChat(mockChatId, mockUserB["userId"], mockUser["userId"])
        )
        .then(() => saveMessageToChatHistory(mockChatId, mockMessage))
        .then((chatRecordResult) => {
          expect(chatRecordResult).toBeDefined()
          expect(chatRecordResult).toHaveProperty("chatId")
          expect(chatRecordResult).toHaveProperty("chatMessages")
          const { chatMessages } = chatRecordResult
          expect(Array.isArray(chatMessages)).toBeTruthy()
          done()
        })
        .catch(done)
    })
  })
})

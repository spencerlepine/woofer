const { mockUser, signupMockUser, mockRes } = global.testHelpers

const fetchChatHistory = require("./index")
const saveMessageToChatHistory = require("../saveMessageToChatHistory")

describe("fetchChatHistory controller", () => {
  describe("with invalid arguments", () => {
    const invalidReq = {}

    test("should return a promise", () => {
      const result = fetchChatHistory(invalidReq, mockRes)
      expect(result.constructor).toBe(Promise)
    })

    test("should not throw an error with invalid arguments", (done) => {
      fetchChatHistory(invalidReq, mockRes)
        .catch((err) => {
          expect(err).not.toBeTruthy()
          done(err)
        })
        .then(() => {
          done()
        })
    })

    test("should not resolve with queue given invalid arguments", (done) => {
      const invalidIdReq = {
        query: {},
      }

      const mockResolve = {
        status: () => ({
          json: (response) => {
            expect(response).toBeDefined()
            expect(response).not.toHaveProperty("matchQueue")
            done()
          },
        }),
      }

      fetchChatHistory(invalidIdReq, mockResolve).catch(done)
    })
  })

  describe("with valid arguments", () => {
    const mockChatId = "12345261345"

    const mockMessage = {
      messageId: "91234104",
      user: {
        userId: mockUser["userId"],
        name: mockUser["username"],
      },
      value: "This is a test message!",
      time: Date.now(),
    }

    const mockReq = {
      query: {
        chatId: mockChatId,
      },
    }

    test("should resolve with chat history", (done) => {
      const mockResolve = {
        status: () => ({
          json: (chatRecordDoc) => {
            expect(chatRecordDoc).toBeDefined()
            expect(chatRecordDoc).toHaveProperty("chatMessages")
            const { chatMessages } = chatRecordDoc
            expect(Array.isArray(chatMessages)).toBeTruthy()
            expect(chatMessages.length).toBe(3)
            done()
          },
        }),
      }

      signupMockUser(mockUser)
        .then(() => saveMessageToChatHistory(mockChatId, mockMessage))
        .then(() => saveMessageToChatHistory(mockChatId, mockMessage))
        .then(() => saveMessageToChatHistory(mockChatId, mockMessage))
        .then(() => {
          return fetchChatHistory(mockReq, mockResolve)
        })
        .catch(done)
    })
  })
})

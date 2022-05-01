const { mockUser, signupMockUser, mockRes } = global.testHelpers

const fetchLatestChatMessage = require("./index")
const saveMessageToChatHistory = require("../saveMessageToChatHistory")

describe("fetchLatestChatMessage controller", () => {
  describe("with invalid arguments", () => {
    const invalidReq = {}

    test("should return a promise", () => {
      const result = fetchLatestChatMessage(invalidReq, mockRes)
      expect(result.constructor).toBe(Promise)
    })

    test("should not throw an error with invalid arguments", (done) => {
      fetchLatestChatMessage(invalidReq, mockRes)
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

      fetchLatestChatMessage(invalidIdReq, mockResolve).catch(done)
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

    const mockLastMessage = {
      messageId: "91234104",
      user: {
        userId: mockUser["userId"],
        name: mockUser["username"],
      },
      value: "This is the last message",
      time: Date.now(),
    }

    const mockReq = {
      query: {
        chatId: mockChatId,
      },
    }

    test("should resolve with last chat message", (done) => {
      const mockResolve = {
        status: () => ({
          json: (chatMessageResult) => {
            expect(chatMessageResult).toBeDefined()
            expect(chatMessageResult).toHaveProperty("message")
            const { message } = chatMessageResult
            expect(message).toHaveProperty("messageId", mockLastMessage["messageId"])
            expect(message).toHaveProperty("value", mockLastMessage["value"])
            done()
          },
        }),
      }

      signupMockUser(mockUser)
        .then(() => saveMessageToChatHistory(mockChatId, mockMessage))
        .then(() => saveMessageToChatHistory(mockChatId, mockMessage))
        .then(() => saveMessageToChatHistory(mockChatId, mockLastMessage))
        .then(() => {
          return fetchLatestChatMessage(mockReq, mockResolve)
        })
        .catch(done)
    })
  })
})

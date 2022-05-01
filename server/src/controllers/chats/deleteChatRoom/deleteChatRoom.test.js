const { mockUser, mockUserB, signupMockUser, mockRes } = global.testHelpers
const { getModelDocumentById } = require("../../../models/modelHelpers")

const deleteChatRoom = require("./index")
const saveMessageToChatHistory = require("../saveMessageToChatHistory")
const addUserToChat = require("../addUserToChat")

describe("deleteChatRoom controller", () => {
  describe("with invalid arguments", () => {
    const invalidReq = {}

    test("should return a promise", () => {
      const result = deleteChatRoom(invalidReq, mockRes)
      expect(result.constructor).toBe(Promise)
    })

    test("should not throw an error with invalid arguments", (done) => {
      deleteChatRoom(invalidReq, mockRes)
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

      deleteChatRoom(invalidIdReq, mockResolve).catch(done)
    })
  })

  describe("with valid arguments", () => {
    const mockChatId = "12345261345"
    const thisUserId = mockUser["userId"]
    const thatUserId = mockUserB["userId"]

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
        thisUserId,
        thatUserId,
      },
    }

    test("should remove chat from user profiles", (done) => {
      const mockResolve = {
        status: (status) => ({
          json: (chatRecordDoc) => {
            expect(status).toBe(200)
          },
        }),
      }

      signupMockUser(mockUser)
        .then(() => signupMockUser(mockUserB))
        .then(() => addUserToChat(mockChatId, thisUserId, thatUserId))
        .then(() => addUserToChat(mockChatId, thatUserId, thisUserId))
        .then(() => saveMessageToChatHistory(mockChatId, mockMessage))
        .then(() => saveMessageToChatHistory(mockChatId, mockMessage))
        .then(() => saveMessageToChatHistory(mockChatId, mockMessage))
        .then(() => {
          return deleteChatRoom(mockReq, mockResolve)
        })
        .then(() => getModelDocumentById("DogUser", "userId", thisUserId))
        .then((userProfile) => {
          expect(userProfile).toBeDefined()
          expect(userProfile).toHaveProperty("userId", thisUserId)
          expect(userProfile).toHaveProperty("chats")
          const { chats } = userProfile
          expect(Array.isArray(chats)).toBeTruthy()
          expect(chats.length).toBe(0)
        })
        .then(() => getModelDocumentById("DogUser", "userId", thatUserId))
        .then((userProfile) => {
          expect(userProfile).toBeDefined()
          expect(userProfile).toHaveProperty("userId", thatUserId)
          expect(userProfile).toHaveProperty("chats")
          const { chats } = userProfile
          expect(Array.isArray(chats)).toBeTruthy()
          expect(chats.length).toBe(0)
        })
        .then(done)
        .catch(done)
    })
  })
})

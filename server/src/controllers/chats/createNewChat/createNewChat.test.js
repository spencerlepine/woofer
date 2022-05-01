const { mockUser, mockUserB, signupMockUser, mockRes } = global.testHelpers

const createNewChat = require("./index")
const saveMessageToChatHistory = require("../saveMessageToChatHistory")
const { getModelDocumentById } = require("../../../models/modelHelpers")

describe("createNewChat controller", () => {
  describe("with invalid arguments", () => {
    const invalidReq = {}

    test("should return a promise", () => {
      const result = createNewChat(invalidReq, mockRes)
      expect(result.constructor).toBe(Promise)
    })

    test("should not throw an error with invalid arguments", (done) => {
      createNewChat(invalidReq, mockRes)
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

      createNewChat(invalidIdReq, mockResolve).catch(done)
    })
  })

  describe("with valid arguments", () => {
    const mockChatId = "12345261345"

    const mockReq = {
      body: {
        thisUserId: mockUser["userId"],
        thatUserId: mockUserB["userId"],
      },
    }

    test("should resolve and aadd chatIds to user profiles", (done) => {
      const mockResolve = {
        status: () => ({
          json: (chatRecordDoc) => {
            expect(chatRecordDoc).toBeDefined()
            expect(chatRecordDoc).toHaveProperty("chatId")
          },
        }),
      }

      signupMockUser(mockUser)
        .then(() => signupMockUser(mockUserB))
        .then(() => {
          return createNewChat(mockReq, mockResolve)
        })
        .then(() => getModelDocumentById("DogUser", "userId", mockUser["userId"]))
        .then((chatRecordDoc) => {
          expect(chatRecordDoc).toBeDefined()
          expect(chatRecordDoc).toHaveProperty("chats")
          const { chats } = chatRecordDoc
          expect(Array.isArray(chats)).toBeTruthy()
          expect(chats.length).toBe(1)
        })
        .then(() => getModelDocumentById("DogUser", "userId", mockUserB["userId"]))
        .then((chatRecordDoc) => {
          expect(chatRecordDoc).toBeDefined()
          expect(chatRecordDoc).toHaveProperty("chats")
          const { chats } = chatRecordDoc
          expect(Array.isArray(chats)).toBeTruthy()
          expect(chats.length).toBe(1)
          done()
        })
        .catch(done)
    })
  })
})

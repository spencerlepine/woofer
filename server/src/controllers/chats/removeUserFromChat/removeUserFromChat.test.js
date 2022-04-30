const { mockUser, mockUserB, signupMockUser } = global.testHelpers

const removeUserFromChat = require("./index")
const addUserToChat = require("../addUserToChat")

describe("removeUserFromChat controller helper", () => {
  describe("with invalid arguments", () => {
    test("should return a promise", () => {
      const result = removeUserFromChat()
      expect(result.constructor).toBe(Promise)
    })

    test("should not throw an error with invalid arguments", (done) => {
      removeUserFromChat()
        .catch((err) => {
          expect(err).not.toBeTruthy()
          done(err)
        })
        .then(() => {
          done()
        })
    })

    test("should resolve with empty record with invalid arguments", (done) => {
      removeUserFromChat().then((response) => {
        expect(response).toEqual({})
        done()
      })
    })
  })

  // describe("with valid arguments", () => {
  //   const mockChatId = "abc123jkl"
  //   const user = {
  //     ...mockUser,
  //     chats: [
  //       {
  //         chatId: mockChatId
  //       }
  //     ]
  //   }

  //   const validInvokation = removeUserFromChat(mockChatId, user["id"])

  //   test("should resolve updated user profile", (done) => {
  //     const expectedResponse = {
  //       ...user,
  //       chats: []
  //     }

  //     signupMockUser(user)
  //       .then(() => (
  //         addUserToChat(mockChatId, user.id, mockUserB.id)
  //       ))
  //       .then(validInvokation)
  //       .then((response) => {
  //         expect(response).toEqual(expectedResponse)
  //         done()
  //       })
  //       .catch(done)
  //   })
  // })
})

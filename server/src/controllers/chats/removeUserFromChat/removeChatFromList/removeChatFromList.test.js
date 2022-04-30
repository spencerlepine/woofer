const { mockUser, mockUserB, signupMockUser } = global.testHelpers

const removeChatFromList = require("./index")

describe("removeChatFromList helper", () => {
  const idToRemove = "789999"
  const startList = [
    {
      chatId: "123456",
      otherUserId: "abcd123",
    },
    {
      chatId: idToRemove,
      otherUserId: "efgh123",
    },
  ]

  test("should remove a chat object from list", () => {
    const expectedList = [
      {
        chatId: "123456",
        otherUserId: "abcd123",
      },
    ]

    const resultList = removeChatFromList(idToRemove, startList)
    expect(resultList).toEqual(expectedList)
  })
})

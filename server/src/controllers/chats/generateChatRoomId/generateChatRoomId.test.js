const generateChatRoomId = require("./index")

describe("generateChatRoomId helper", () => {
  test("should generate a random alphanumeric string", () => {
    const expectedPattern = new RegExp(/[a-zA-Z0-9]/)

    for (let i = 0; i < 5; i += 1) {
      const result = generateChatRoomId()
      expect(expectedPattern.test(result)).toBeTruthy()
    }
  })
})

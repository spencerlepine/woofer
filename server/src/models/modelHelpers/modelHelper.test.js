const { mockUser } = global.testHelpers

const modelHelpers = require("./index")
const {
  getModelDocumentById,
  updateModelDocumentById,
  deleteModelDocumentById,
  createModelDocumentById,
} = modelHelpers

describe("MongoDB Model Helper functions", () => {
  describe("getModelDocumentById helper function", () => {
    test("should be a function", () => {
      expect(getModelDocumentById).toBeDefined()
      expect(getModelDocumentById.constructor).toBe(Function)
    })

    test("should return a promise", () => {
      const result = getModelDocumentById("DogUser", "userId", "123", {})
      expect(result.constructor).toBe(Promise)
    })

    test("should return an object", (done) => {
      getModelDocumentById("DogUser", "userId", "123", {})
        .then((result) => {
          expect(typeof result).toBe("object")
          done()
        })
        .catch(done)
    })
  })

  describe("updateModelDocumentById helper function", () => {
    test("should be a function", () => {
      expect(updateModelDocumentById).toBeDefined()
      expect(updateModelDocumentById.constructor).toBe(Function)
    })

    test("should return a promise", () => {
      const result = updateModelDocumentById("DogUser", "userId", "123", {})
      expect(result.constructor).toBe(Promise)
    })

    test("should return an object", (done) => {
      updateModelDocumentById("DogUser", "userId", "123", {})
        .then((result) => {
          expect(typeof result).toBe("object")
          done()
        })
        .catch(done)
    })

    test("should return the updated object", (done) => {
      const newMessage = {
        messageId: "123",
        time: "now",
        user: "mockUser",
        value: "test",
      }

      const updatedMessage = Object.create(newMessage)
      const newValue = "YEET"
      updatedMessage["value"] = newValue

      createModelDocumentById("Message", "messageId", "123", newMessage)
        .then(() =>
          updateModelDocumentById("Message", "messageId", "123", updatedMessage)
        )
        .then((messageDoc) => {
          expect(messageDoc).toBeDefined()
          expect(messageDoc).toHaveProperty("value", newValue)
          done()
        })
        .catch(done)
    })

    test("should return the updated user object", (done) => {
      const userId = mockUser["userId"]
      const updatedUser = Object.create(mockUser)
      updatedUser["zipcodes"] = ["10001"]

      createModelDocumentById("DogUser", "userId", userId, mockUser)
        .then(() =>
          updateModelDocumentById("DogUser", "userId", userId, updatedUser)
        )
        .then((userDoc) => {
          expect(userDoc).toBeDefined()
          expect(userDoc).toHaveProperty("zipcodes")
          expect(userDoc.zipcodes).toEqual(["10001"])
          done()
        })
        .catch(done)
    })
  })

  describe("deleteModelDocumentById helper function", () => {
    test("should be a function", () => {
      expect(deleteModelDocumentById).toBeDefined()
      expect(deleteModelDocumentById.constructor).toBe(Function)
    })

    test("should return a promise", () => {
      const result = deleteModelDocumentById("DogUser", "userId", "123", {})
      expect(result.constructor).toBe(Promise)
    })
  })

  describe("createModelDocumentById helper function", () => {
    test("should be a function", () => {
      expect(createModelDocumentById).toBeDefined()
      expect(createModelDocumentById.constructor).toBe(Function)
    })

    test("should return a promise", () => {
      const result = createModelDocumentById(
        "DogUser",
        "userId",
        "123",
        mockUser
      ).catch(() => {})
      expect(result.constructor).toBe(Promise)
    })
  })
})

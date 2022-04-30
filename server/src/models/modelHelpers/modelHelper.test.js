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

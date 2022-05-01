const ApiError = require("./ApiError")

describe("ApiError util function", () => {
  test("should return a class", () => {
    expect(ApiError.constructor).toBe(Function)
  })

  test("should instantiate a class", () => {
    const newError = new ApiError()
    expect(newError).toBeTruthy()

    const anotherError = new ApiError(500, "", true, {})
    expect(newError).toBeTruthy()
  })
})

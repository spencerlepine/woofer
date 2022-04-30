const isMutualMatch = require("./index")

describe("isMutualMatch helper", () => {
  test("should return false given invalid arguments", () => {
    const invalidObj = {}
    const result = isMutualMatch(invalidObj)
    expect(result).not.toBeTruthy()
  })

  test("should return false given non-mutual match", () => {
    const falseMatches = [
      {
        user123456: "none",
        user123487: "none",
      },
      {
        user123456: "reject",
        user123487: "none",
      },
      {
        user123456: "reject",
        user123487: "reject",
      },
      {
        user123456: "accept",
        user123487: "reject",
      },
      {
        user123456: "accept",
        user123487: "none",
      },
    ]

    falseMatches.forEach((matchObj) => {
      const result = isMutualMatch(matchObj)
      expect(result).not.toBeTruthy()
    })
  })

  test("should return true given mutual match", () => {
    const mutalMatch = {
      user123456: "accept",
      user123487: "accept",
    }
    const result = isMutualMatch(mutalMatch)
    expect(result).toBeTruthy()
  })
})

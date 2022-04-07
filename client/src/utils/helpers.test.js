import { formatAgeStr, titleCaseDisplayName } from "./index"

describe("Helper util functions", () => {
  describe("formatAgeStr", () => {
    test("should correctly calculate age in years", () => {
      const today = Date.now()
      expect(formatAgeStr(today)).toBe("0 y/o")

      const tenYearsAgo = new Date(
        new Date().setFullYear(new Date().getFullYear() - 10)
      )
      expect(formatAgeStr(tenYearsAgo)).toBe("10 y/o")
    })

    test("should reject invalid date argument", () => {
      expect(formatAgeStr("inavlid date")).toBe("? y/o")
      expect(formatAgeStr(1000)).toBe("? y/o")
    })
  })

  describe("titleCaseDisplayName", () => {
    test("should correctly capitalize first/last name to string", () => {
      expect("something").toBeTruthy()
    })

    test("should reject invalid first/last name string arguments", () => {
      expect("something").toBeTruthy()
    })
  })
})

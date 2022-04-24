import * as zipcodesAPI from "./index"

describe("Zipcodes API helpers", () => {
  test("should export helper functions", () => {
    const expectedExports = ["removeUserFromZipcode", "addUserToZipcode"]

    expectedExports.forEach((exportName) => {
      expect(zipcodesAPI[exportName]).toBeTruthy()
    })
  })

  test("should invoke add function without throwing error", () => {
    const addZipCode = zipcodesAPI.addUserToZipcode
    addZipCode()
  })

  test("should invoke add function without throwing error", () => {
    const removeZipCode = zipcodesAPI.removeUserFromZipcode
    removeZipCode()
  })
})

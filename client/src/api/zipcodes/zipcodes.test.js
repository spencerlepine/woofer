import * as zipcodesAPI from "./index"

describe("Zipcodes API helpers", () => {
  test("should export helper functions", () => {
    const expectedExports = ["removeUserFromZipcode", "addUserToZipcode"]

    expectedExports.forEach((exportName) => {
      expect(firebaseAPI[exportName]).toBeTruthy()
    })
  })

  // test("should invoke upload function without throwing error", () => {
  //   const uploadImage = firebaseAPI.uploadImageToFirebase
  //   uploadImage()
  //   uploadImage("https://firebasestorage.googleapis.com/v0/b/quickcart-development.appspot.com/o/images%2FeDNzWk2xAIWlrqs57Lh0sZNXJ0s2%2FFlEqwnQNIOYenXTh.png?alt=media&token=17c8d5a7-f545-40b2-8020-47760889d3e9")
  // })

  // test("should invoke delete function without throwing error", () => {
  //   const deleteImage = firebaseAPI.deleteImageFromFirebase
  //   deleteImage("")
  //   deleteImage("https://firebasestorage.googleapis.com/v0/b/quickcart-development.appspot.com/o/images%2FeDNzWk2xAIWlrqs57Lh0sZNXJ0s2%2FFlEqwnQNIOYenXTh.png?alt=media&token=17c8d5a7-f545-40b2-8020-47760889d3e9", () => { })
  // })
})

const deleteUserDocument = require('./index')

describe("Delete user profile document", () => {
  const userID = "john1234"
  
   test('should resolve with valid arguments', (done) => {
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      }
      const query = { id: userID }
      const options = { justOne: true }

     const result = deleteUserDocument(res, query, options)
     expect(result.constructor).toBe(Promise)

     result
        .then(() => {})
       .catch((err) => err)
       .then((possibleErr) => {
         expect(possibleErr).not.toBeTruthy()
         done()
       })
    })

    test('should throw an error with missing or invalid arguments', (done) => {
       deleteUserDocument()
        .then(() => {})
       .catch((err) => err)
       .then((possibleErr) => {
         expect(possibleErr).toBeTruthy()
         done()
       })
    })
})

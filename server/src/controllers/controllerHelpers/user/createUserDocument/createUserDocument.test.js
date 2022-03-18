const createUserDocument = require('./index')

describe("Create user profile document", () => {
  const userID = "john1234"
  const email = "john@gmail.com"
  
   test('should resolve with valid arguments', (done) => {
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      }
      const query = { id: userID }
      const update = { '$set': {
        "id": userID,
        email,
      } }
      const options = { upsert: true, multi: true }

     const successCallback = jest.fn()

     const result = createUserDocument(res, query, update, options, successCallback)
     expect(result.constructor).toBe(Promise)

     result
        .then(() => {})
       .catch((err) => err)
       .then((possibleErr) => {
         expect(possibleErr).not.toBeTruthy()
         expect(successCallback.mock.calls.length).toBe(1)
         done()
       })
    })

    test('should throw an error with missing or invalid arguments', (done) => {
       createUserDocument()
        .then(() => {})
       .catch((err) => err)
       .then((possibleErr) => {
         expect(possibleErr).toBeTruthy()
         done()
       })
    })
})

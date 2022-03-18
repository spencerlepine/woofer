const fetchUserDocument = require('./index')

describe("Fetch user profile document", () => {
  const userID = "john1234"
    
   test('should resolve with valid arguments', (done) => {
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      }
      const query = { id: userID }
      
     const result = fetchUserDocument(res, query)
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
       fetchUserDocument()
        .then(() => {})
       .catch((err) => err)
       .then((possibleErr) => {
         expect(possibleErr).toBeTruthy()
         done()
       })
    })
})

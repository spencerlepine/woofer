const addUserToZipcodePool = require('./index')

describe("Add user to zipcode pool helper", () => {
  const userID = "john1234"
  const zipcodeID = "10001"
  
   test('should resolve with valid arguments', (done) => {
      const res = {
        status: jest.fn(),
        json: jest.fn()
      }

     const result = addUserToZipcodePool(res, userID, zipcodeID)
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
       addUserToZipcodePool()
        .then(() => {})
       .catch((err) => err)
       .then((possibleErr) => {
         expect(possibleErr).toBeTruthy()
         done()
       })
    })
})

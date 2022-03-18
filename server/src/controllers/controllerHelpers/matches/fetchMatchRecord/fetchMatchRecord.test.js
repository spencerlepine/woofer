const fetchMatchRecord = require('./index')

describe("Fetch match record document", () => {
  const userID = "john1234"
      
   test('should resolve with valid arguments', (done) => {
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      }
      const query = { id: userID }
            
     const result = fetchMatchRecord(res, query)
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
       fetchMatchRecord()
        .then(() => {})
       .catch((err) => err)
       .then((possibleErr) => {
         expect(possibleErr).toBeTruthy()
         done()
       })
    })
})

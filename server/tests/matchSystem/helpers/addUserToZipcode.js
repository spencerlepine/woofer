const request = require("supertest")
const { app } = global.testHelpers

const addUserToZipCode = (userId, zipcode) => {
  const url = "/api/zipcodes/add"
  const body = {
    userId: userId,
    zipcode: zipcode,
  }

  return request(app).post(url).send(body)
}

module.exports = addUserToZipCode

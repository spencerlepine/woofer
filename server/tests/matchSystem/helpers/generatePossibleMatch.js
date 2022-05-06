const request = require("supertest")
const { app } = global.testHelpers

const generatePossibleMatch = (userId) => {
  const url = "/api/matches/generate"
  const query = {
    userId: userId,
  }

  return request(app).get(url).query(query)
}

module.exports = generatePossibleMatch

const request = require("supertest")
const { app } = global.testHelpers

const swipeOnUser = (thisUserId, thatUserId, matchStatus) => {
  const url = "/api/matches/swipe"

  const body = {
    thisUserId,
    thatUserId,
    matchStatus,
  }

  return request(app).post(url).send(body)
}

module.exports = swipeOnUser

const request = require("supertest")
const { app } = global.testHelpers

const swipeOnUser = (thisUserId, thatUserId, matchStatus) => {
  const url = "/api/matches/swipe"

  const body = {
    thisUserId,
    thatUserId,
    matchStatus,
  }

  return request(app)
    .post(url)
    .send(body)
    .then((res) => {
      return res.body
    })
}

module.exports = swipeOnUser

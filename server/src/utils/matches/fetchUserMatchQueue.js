const MatchQueue = require("../../models/MatchQueue")
const { DATA_KEYS } = require("../../../config/constants")

const fetchUserMatchQueue = (res, thisUserId, thatUserId) => {
  const userIdQuery = { [DATA_KEYS["USER_ID"]]: thisUserId }

  return MatchQueue.findOne(userIdQuery).then((result) => {
    if (result) {
      return result[DATA_KEYS["USER_QUEUE"]]
    }
    return []
  })
}

module.exports = fetchUserMatchQueue

const controllerHelpers = require('../../helpers')

const fetchUserMatchQueue = ({
  DATA_KEYS,
  models: { MatchQueue },
  handleErrorResponse
}) => (res, thisUserId, thatUserId) => {
  if (res === undefined || thisUserId === undefined || thisUserId  === undefined) {
    const err = 'fetchUserMatchQueue called with invalid arguments'
    const failPromise = new Promise((resolve, reject) => {
      reject(err);
    })
    return failPromise
  }
  
  const userIdQuery = { [DATA_KEYS["USER_ID"]]: thisUserId }

  return MatchQueue.findOne(userIdQuery).then((result) => {
    if (result) {
      return result[DATA_KEYS["USER_QUEUE"]]
    }
    return []
  })
}

module.exports = fetchUserMatchQueue(controllerHelpers)

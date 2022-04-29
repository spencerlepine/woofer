const controllerHelpers = require("../../helpers")

const fetchUserChatList =
  ({ DATA_KEYS, models: { DogUser }, handleErrorResponse }) =>
  (res, query) => {
    const invalidRes = typeof res !== "object" || Object.keys(res).length === 0
    if (invalidRes || query === undefined) {
      const err = "fetchUserChatList called with invalid arguments"
      const failPromise = new Promise((resolve, reject) => {
        reject(err)
      })
      return failPromise
    }

    return DogUser.findOne(query).then(
      (result) => {
        if (result) {
          return {
            [DATA_KEYS["USER_CHATS"]]: result[[DATA_KEYS["USER_CHATS"]]],
          }
        }
        return {
          [DATA_KEYS["USER_CHATS"]]: [],
        }
      },
      (err) =>
        handleErrorResponse(res, `Error finding user chat list => ${err}`, 500)
    )
  }

module.exports = fetchMatchRecords(controllerHelpers)

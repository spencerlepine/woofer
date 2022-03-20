const controllerHelpers = require("../../helpers")

const fetchMatchRecords =
  ({ DATA_KEYS, models: { MatchRecords }, handleErrorResponse }) =>
    (res, query) => {
      const invalidRes = (typeof res !== "object" || Object.keys(res).length === 0)
      if (invalidRes || query === undefined) {
        const err = "fetchMatchRecords called with invalid arguments"
        const failPromise = new Promise((resolve, reject) => {
          reject(err)
        })
        return failPromise
      }

      return MatchRecords.findOne(query).then(
        (result) => {
          if (result) {
            return result[DATA_KEYS["USER_MATCHES"]]
          }
          return {}
        },
        (err) =>
          handleErrorResponse(res, `Error finding user match record => ${err}`, 500)
      )
    }

module.exports = fetchMatchRecords(controllerHelpers)

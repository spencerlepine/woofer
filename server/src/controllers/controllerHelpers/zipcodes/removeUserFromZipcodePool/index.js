const controllerHelpers = require("../../helpers")

const removeUserFromZipcodePool =
  ({ DATA_KEYS, models: { ZipcodePool }, handleErrorResponse }) =>
  (res, userID, zipcodeID) => {
    if (res === undefined || userID === undefined || zipcodeID === undefined) {
      const err = "removeUserFromZipcodePool called with invalid arguments"
      const failPromise = new Promise((resolve, reject) => {
        reject(err)
      })
      return failPromise
    }

    return ZipcodePool.findOne({ [DATA_KEYS["ZIPCODE_ID"]]: zipcodeID }).then(
      (result) => {
        let poolUsersObj = {}

        if (result) {
          poolUsersObj = result[DATA_KEYS["POOL_USERS"]]
        }

        if (poolUsersObj[userID]) {
          delete poolUsersObj[userID]
        }

        const query = { [DATA_KEYS["ZIPCODE_ID"]]: zipcodeID }
        const update = {
          $set: {
            [DATA_KEYS["POOL_USERS"]]: poolUsersObj,
          },
        }
        const options = { upsert: true, multi: true }

        return ZipcodePool.updateOne(query, update, options)
      },
      (err) =>
        handleErrorResponse(res, `Unable to update user to zipcode: ${err}`, 409)
    )
  }

module.exports = removeUserFromZipcodePool(controllerHelpers)

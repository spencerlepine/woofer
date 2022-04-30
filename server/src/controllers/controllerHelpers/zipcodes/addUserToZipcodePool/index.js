const controllerHelpers = require("../../helpers")

const addUserToZipcodePool =
  ({ DATA_KEYS, models: { ZipcodePool }, handleErrorResponse }) =>
  (res, userId, zipcodeID) => {
    if (res === undefined || userId === undefined || zipcodeID === undefined) {
      const err = "addUserToZipcodePool called with invalid arguments"
      const failPromise = new Promise((resolve, reject) => {
        reject(err)
      })
      return failPromise
    }

    return ZipcodePool.findOne({ [DATA_KEYS["ZIPCODE_ID"]]: zipcodeID })
      .then((result) => {
        let poolUsersObj = {}

        if (result) {
          poolUsersObj = result[DATA_KEYS["POOL_USERS"]]
        }

        poolUsersObj[userId] = 1

        const query = { [DATA_KEYS["ZIPCODE_ID"]]: zipcodeID }
        const update = {
          $set: {
            [DATA_KEYS["POOL_USERS"]]: poolUsersObj,
          },
        }
        const options = { upsert: true, multi: true }
        return [query, update, options]
      })
      .then(([query, update, options]) => {
        return ZipcodePool.updateOne(query, update, options)
      })
      .catch((err) =>
        handleErrorResponse(res, `Unable to update user to zipcode: ${err}`, 409)
      )
  }

module.exports = addUserToZipcodePool(controllerHelpers)

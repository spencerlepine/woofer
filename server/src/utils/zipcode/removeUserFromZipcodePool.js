const { DATA_KEYS } = require("../../../config/constants")
const ZipcodePool = require("../../models/ZipcodePool")
const handleErrorResponse = require("../handleErrorResponse")

const removeUserFromZipcodePool = (res, userID, zipcodeID) => {
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

module.exports = removeUserFromZipcodePool

const { DATA_KEYS } = require("../../../../../config/constants")
const ZipcodePool = require("../../../../models/ZipcodePool")

const fetchZipPoolUsers = (zipcodePoolId) => {
  const invalidArgs = zipcodePoolId === undefined
  if (invalidArgs) {
    const err = "fetchZipPoolUsers called with invalid arguments"
    const failPromise = new Promise((resolve, reject) => {
      reject(err)
    })
    return failPromise
  }

  const query = {
    [DATA_KEYS["ZIPCODE_ID"]]: zipcodePoolId,
  }

  return ZipcodePool.findOne(query).then((result) => {
    if (result) {
      // Get the zipcode pool
      const { [DATA_KEYS["POOL_USERS"]]: poolUsers } = result
      return Object.keys(poolUsers || {})
    }
    return []
  })
}

module.exports = fetchZipPoolUsers

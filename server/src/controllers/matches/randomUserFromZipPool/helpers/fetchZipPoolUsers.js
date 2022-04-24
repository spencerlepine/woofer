const { DATA_KEYS } = require("../../../../../config/constants")
const ZipcodePool = require("../../../../models/ZipcodePool")

const fetchUsersInZipCodePool = (zipcodePoolId) => {
  const query = {
    [DATA_KEYS["ZIPCODE_ID"]]: zipcodePoolId,
  }

  return ZipcodePool.findOne(query).then((result) => {
    if (result) {
      // Get the zipcode pool
      const { [DATA_KEYS["POOL_USERS"]]: poolUsers } = result
      return Object.keys(poolUsers || {})
    } else {
      return []
    }
  })
}

module.exports = fetchUsersInZipCodePool

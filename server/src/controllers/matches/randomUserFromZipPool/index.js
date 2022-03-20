const ZipcodePool = require("../../../models/ZipcodePool")
const { DATA_KEYS } = require("../../../../config/constants")
const fetchUserDocument = require("../../controllerHelpers/user/fetchUserDocument")

const verifyUserMatchStatuses = require("./verifyUserMatchStatuses")

const randomUserFromZipPool = (res, userId, userZipcodes, genderPreference) => {
  const invalidRes = typeof res !== "object" || Object.keys(res).length === 0
  if (invalidRes || !userId || !userZipcodes || !genderPreference) {
    const err = "randomUserFromZipPool called with invalid arguments"
    const failPromise = new Promise((resolve, reject) => {
      reject(err)
    })
    return failPromise
  }

  const userQuery = { [DATA_KEYS["USER_ID"]]: userId }

  return ZipcodePool.findOne(userQuery)
    .then((result) => {
      if (result) {
        // Get the zipcode pool
        const { [DATA_KEYS["POOL_USERS"]]: poolUsers } = result
        console.log(poolUsers)
        return poolUsers || {}
      } else {
        return {}
      }
    })
    .then((poolUsers) => {
      // Pick a random userId from the ZipcodePool
      const userIdKeys = Object.keys(poolUsers)

      if (userIdKeys.length === 0) {
        res.status(409).json("No users stored in this pool")
      } else {
        let validUserId = null
        while (!validUserId) {
          const tempId = userIdKeys[Math.floor(Math.random() * userIdKeys.length)]
          if (tempId !== userId) {
            validUserId = tempId
          }
        }

        return fetchUserDocument(res, userQuery)
      }
    })
    .then((possibleUser) => {
      if (!possibleUser) {
        return { possibleUser: {}, matchIsValid: false }
      } else {
        // Verify this is the preferrred gender
        const { [DATA_KEYS["USER_GENDER"]]: theirGender } = possibleUser
        const thatUserId = possibleUser[DATA_KEYS["USER_ID"]]

        const validGender = theirGender !== genderPreference
        if (validGender) {
          return verifyUserMatchStatuses(res, userId, thatUserId)
        }
        return { [DATA_KEYS["USER_PROFILE"]]: {}, matchIsValid: false }
      }
    })
    .then((result) => {
      const { [DATA_KEYS["USER_PROFILE"]]: possibleUser, matchIsValid } = result

      // Verify there hasn't been a match between these users previously
      return {
        [DATA_KEYS["USER_PROFILE"]]: matchIsValid ? possibleUser : null,
        matchIsValid,
      }
    })
}

module.exports = randomUserFromZipPool

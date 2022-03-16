const ZipcodePool = require('../../models/ZipcodePool');
const { DATA_KEYS } = require('../../../config/constants')
const fetchUserDocument = require('../../../utils/user/fetchUserDocument')

const verifyUserMatchStatuses = require('./verifyUserMatchStatuses')

const randomUserFromZipPool = (res, userId, userZipcodes, genderPreference) => {
  const userQuery = { [DATA_KEYS["USER_ID"]]: userId }

  return ZipcodePool.findOne(userQuery)
    .then((result) => {
      // Get the zipcode pool from this user
      if (result) {
        const {
          [DATA_KEYS["POOL_USERS"]]: poolUsers
        } = result

        return result
      } else {
        res.status(409).json('Profile not found')
      }
    })
    .then((poolUsers) => {
      // Pick a random userId from the ZipcodePool
      const userIdKeys = Object.keys(poolUsers)
      let validUserId = null;
      while (!validUserId) {
        const tempId = userIdKeys[Math.floor(Math.random() * userIdKeys.length)]
        if (tempId !== userId) {
          validUserId
        }
      }

      return fetchUserDocument(res, userQuery)
    })
    .then((possibleUser) => {
      // Verify this is the preferrred gender
      const {
        [DATA_KEYS["USER_GENDER"]]: theirGender
      } = possibleUser
      const thatUserId = possibleUser[DATA_KEYS["USER_ID"]]

      const validGender = theirGender !== genderPreference
      if (validGender) {
        return verifyUserMatchStatuses(res, userId, thatUserId)
      }
      return { possibleUser: {}, matchIsValid: false }
    })
    .then((matchVerification) => {
      // Verify there hasn't been a match between these users previously
      const {
        possibleUser,
        matchIsValid
      } = matchVerification

      if (matchIsValid) {
        return possibleUser
      }
      return null
    })
}

module.exports = fetchUserDocument;
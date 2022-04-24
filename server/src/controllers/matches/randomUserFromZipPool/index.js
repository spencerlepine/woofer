const ZipcodePool = require("../../../models/ZipcodePool")
const { DATA_KEYS } = require("../../../../config/constants")
const handleErrorResponse = require("../../../utils/handleErrorResponse")
const fetchUserDocument = require("../../controllerHelpers/user/fetchUserDocument")

const {
  fetchZipPoolUsers,
  pickRandomUserFromPool,
  validateUserPreferences,
  validateUserMatchRecords,
} = require("./helpers")

const randomUserFromZipPool = (res, userId) => {
  // Validate the function parameters
  const invalidRes = typeof res !== "object" || Object.keys(res).length === 0
  if (invalidRes || !userId) {
    const err = "randomUserFromZipPool called with invalid arguments"
    const failPromise = new Promise((resolve, reject) => {
      reject(err)
    })
    return failPromise
  }

  let thisUserProfile = {}
  let thatUserProfile = {}

  return fetchUserDocument(res, { [DATA_KEYS["USER_ID"]]: userId })
    .then((userProfile) => {
      thisUserProfile = userProfile

      const { [DATA_KEYS["USER_ZIPCODES"]]: userZipcodes } = userProfile

      return fetchZipPoolUsers((userZipcodes || [])[0])
    })
    .then((poolUsers) => pickRandomUserFromPool(poolUsers, userId))
    .then((possibleUserId) =>
      fetchUserDocument(res, { [DATA_KEYS["USER_ID"]]: possibleUserId })
    )
    .then((possibleUser) => {
      thatUserProfile = possibleUser
    })
    .then(() => validateUserPreferences(thisUserProfile, thatUserProfile))
    .then((preferencesValid) =>
      validateUserMatchRecords(thisUserProfile, thatUserProfile).then(
        (matchIsValid) => preferencesValid && matchIsValid
      )
    )
    .then((matchIsValid) => {
      return {
        [DATA_KEYS["USER_PROFILE"]]: matchIsValid ? thatUserProfile : null,
        matchIsValid,
      }
    })
    .catch((err) => {
      handleErrorResponse(res, `Error getting user from pool => ${err}`, 409)
    })
}

module.exports = randomUserFromZipPool

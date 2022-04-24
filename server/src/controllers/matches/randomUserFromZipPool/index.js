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

const randomUserFromZipPool = (res, userId, userZipcodes, genderPreference) => {
  // Validate the function parameters
  const invalidRes = typeof res !== "object" || Object.keys(res).length === 0
  if (invalidRes || !userId || !userZipcodes || !genderPreference) {
    const err = "randomUserFromZipPool called with invalid arguments"
    const failPromise = new Promise((resolve, reject) => {
      reject(err)
    })
    return failPromise
  }

  let thisUserProfile = {}
  let thatUserProfile = {}

  fetchUserDocument(res, { [DATA_KEYS["USER_ID"]]: userId })
    .then((userProfile) => {
      thisUserProfile = userProfile
    })
    .then(() => fetchZipPoolUsers(userZipcodes[0]))
    .then((poolUsers) => pickRandomUserFromPool(poolUsers))
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

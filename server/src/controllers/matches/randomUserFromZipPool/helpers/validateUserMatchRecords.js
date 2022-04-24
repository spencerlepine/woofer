const controllerHelpers = require("../../../controllerHelpers/helpers")

const fetchBothUserMatchRecords = require("./fetchBothUserMatchRecords")

const validateUserMatchRecords =
  ({ DATA_KEYS, handleErrorResponse }) =>
  (thisUserProfile, thatUserProfile) => {
    const idKey = DATA_KEYS["USER_ID"]
    const thisUserId = thisUserProfile[idKey]
    const thatUserId = thatUserProfile[idKey]

    return fetchBothUserMatchRecords().then(([matchRecordsA, matchRecordsB]) => {
      const existingMatchA = matchRecordsA[thatUserId]
      const existingMatchB = matchRecordsB[thisUserId]

      if (existingMatchA || existingMatchB) {
        return false
      }
      return true
    })
  }

module.exports = validateUserMatchRecords(controllerHelpers)

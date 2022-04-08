const controllerHelpers = require("../../../controllerHelpers/helpers")

const fetchUserDocument = require("../../../controllerHelpers/user/fetchUserDocument")

const verifyUserMatchStatuses =
  ({ DATA_KEYS, models: { MatchRecords }, handleErrorResponse }) =>
  (res, thisUserId, thatUserId) => {
    let stillAValidMatch = true

    const invalidRes = typeof res !== "object" || Object.keys(res).length === 0
    if (invalidRes || !thisUserId || !thatUserId) {
      const err = "verifyUserMatchStatuses called with invalid arguments"
      const failPromise = new Promise((resolve, reject) => {
        reject(err)
      })
      return failPromise
    }

    const fetchRecordsA = MatchRecords.findOne({
      [DATA_KEYS["USER_ID"]]: thisUserId,
    })
    const fetchRecordsB = MatchRecords.findOne({
      [DATA_KEYS["USER_ID"]]: thatUserId,
    })
    const checkForExistingMatch = (fetchRecord, userId) => {
      return fetchRecord.then((matchRecordDoc) => {
        if (matchRecordDoc && matchRecordDoc[DATA_KEYS["USER_MATCHES"]]) {
          const { [DATA_KEYS["USER_MATCHES"]]: userMatchRecords } = matchRecordDoc
          // If this key already existed, there was a swipe
          const existingMatch = userMatchRecords[userId]
          if (existingMatch !== undefined) {
            stillAValidMatch = false
            res.status(422).json("User has previously matched with this user")
          }
        }
      })
    }

    return checkForExistingMatch(fetchRecordsA, thatUserId)
      .then(() => {
        return checkForExistingMatch(fetchRecordsB, thisUserId)
      })
      .then(() => {
        const userQuery = { [DATA_KEYS["USER_ID"]]: thatUserId }
        return fetchUserDocument(res, userQuery)
      })
      .then((userProfile) => {
        const possibleMatch = DATA_KEYS["USER_PROFILE"]
        return { [possibleMatch]: userProfile, matchIsValid: stillAValidMatch }
      })
      .catch((err) => {
        handleErrorResponse(res, `Error verifying user match status => ${err}`, 500)
      })
  }

module.exports = verifyUserMatchStatuses(controllerHelpers)

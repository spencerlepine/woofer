const controllerHelpers = require("../../../controllerHelpers/helpers")

const fetchBothUserMatchRecords =
  ({ DATA_KEYS, models: { MatchRecords } }) =>
  (thisUserProfile, thatUserProfile) => {
    const invalidUserA =
      typeof thisUserProfile !== "object" ||
      Object.keys(thisUserProfile).length === 0
    const invalidUserB =
      typeof thatUserProfile !== "object" ||
      Object.keys(thatUserProfile).length === 0
    if (invalidUserA || invalidUserB) {
      const err = "fetchBothUserMatchRecords called with invalid arguments"
      const failPromise = new Promise((resolve, reject) => {
        reject(err)
      })
      return failPromise
    }

    const fetchRecordPromise = (query) => {
      return MatchRecords.findOne(query).then((matchRecordDoc) => {
        if (matchRecordDoc && matchRecordDoc[DATA_KEYS["USER_MATCHES"]]) {
          const { [DATA_KEYS["USER_MATCHES"]]: userMatchRecords } = matchRecordDoc
          return userMatchRecords
        } else {
          return {}
        }
      })
    }

    const idKey = DATA_KEYS["USER_ID"]
    const thisUserQuery = { [idKey]: thisUserProfile[idKey] }
    const thatUserQuery = { [idKey]: thatUserProfile[idKey] }
    return Promise.all([
      fetchRecordPromise(thisUserQuery),
      fetchRecordPromise(thatUserQuery),
    ])
  }

module.exports = fetchBothUserMatchRecords(controllerHelpers)

const controllerHelpers = require("../../../controllerHelpers/helpers")

const fetchBothUserMatchRecords =
  ({ DATA_KEYS, models: { MatchRecords } }) =>
  (thisUserProfile, thatUserProfile) => {
    const fetchRecordPromise = (query) =>
      MatchRecords.findOne(query).then((matchRecordDoc) => {
        if (matchRecordDoc && matchRecordDoc[DATA_KEYS["USER_MATCHES"]]) {
          const { [DATA_KEYS["USER_MATCHES"]]: userMatchRecords } = matchRecordDoc
          return userMatchRecords
        } else {
          return {}
        }
      })

    const idKey = DATA_KEYS["USER_ID"]
    const thisUserQuery = { [idKey]: thisUserProfile[idKey] }
    const thatUserQuery = { [idKey]: thatUserProfile[idKey] }
    return Promise.all([
      fetchRecordPromise(thisUserQuery),
      fetchRecordPromise(thatUserQuery),
    ])
  }

module.exports = fetchBothUserMatchRecords(controllerHelpers)

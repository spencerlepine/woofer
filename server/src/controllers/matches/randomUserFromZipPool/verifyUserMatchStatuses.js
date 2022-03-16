const MatchRecords = require('../../models/MatchRecords');
const { DATA_KEYS } = require('../../../config/constants')

const fetchUserDocument = require('../../../utils/user/fetchUserDocument')

const verifyUserMatchStatuses = (res, thisUserId, thatUserId) => {
  const fetchRecordsA = MatchRecords.findOne({ [DATA_KEYS["USER_ID"]]: thisUserId })
  const fetchRecordsB = MatchRecords.findOne({ [DATA_KEYS["USER_ID"]]: thatUserId })
  
  fetchRecordsA  
    .then((matchRecordDoc) => {
      if (matchRecordDoc) {
        // If this key already existed, there was a swipe
        if (matchRecordDoc[thatUserId] !== undefined) {
          res.status(422).json('User has previously matched with this user')
        }
      }
    }, (err) => handleErrorResponse(res, `Error searching match records for user => ${err}`, 500))
    .then(() => fetchRecordsB)
    .then((matchRecordDoc) => {
        if (matchRecordDoc) {
          // If this key already existed, there was a swipe
          if (matchRecordDoc[thisUserId] !== undefined) {
            res.status(422).json('User has previously matched with this user')
          }
        }
      }, (err) => handleErrorResponse(res, `Error searching match records for user => ${err}`, 500))
  .then(() => {
    return fetchUserProfile(res, { [DATA_KEYS["USER_ID"]]: thatUserId })
  })
  .then((userProfile) => {
    return { possibleUser: userProfile, matchIsValid: true }
  })
}

module.exports = fetchUserDocument;
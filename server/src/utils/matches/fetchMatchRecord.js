const { DATA_KEYS } = require('../../../config/constants')
const MatchRecords = require('../../models/MatchRecords');
const handleErrorResponse = require('../handleErrorResponse')

const findMatchRecords = (res, query) => {
  return MatchRecords.findOne(query)
    .then(
      (result) => {
        if (result) {
          return result[DATA_KEYS["USER_MATCHES"]]
        }
        return {}
      },
      (err) => handleErrorResponse(res, `Error finding user match record => ${err}`, 500),
    );
}

module.exports = findMatchRecords;
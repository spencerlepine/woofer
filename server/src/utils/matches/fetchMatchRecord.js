const MatchRecord = require('../../models/MatchRecord');
const handleErrorResponse = require('../handleErrorResponse')

const findMatchRecord = (res, query) => {
  return MatchRecord.findOne(query)
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

module.exports = findMatchRecord;
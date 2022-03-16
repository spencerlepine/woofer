const MatchRecord = require('../../models/MatchRecord');
const handleErrorResponse = require('../handleErrorResponse')

const updateUserMatchRecord = (res, query, update, options) => {
  return MatchRecord.udpateOne(query, update, options)
    .then(
      (result) => {
        if (result) {
          return findMatchRecord(res, query)
        }
        handleErrorResponse(res, `Error updating user match record => ${err}`, 500
      },
      (err) => handleErrorResponse(res, `Error updating user match record => ${err}`, 500),
    );
}

module.exports = updateUserMatchRecord;
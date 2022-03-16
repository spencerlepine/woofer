const MatchRecords = require('../../models/MatchRecords');
const handleErrorResponse = require('../handleErrorResponse')
const fetchMatchRecord = require('./fetchMatchRecord')

const updateUserMatchRecord = (res, query, update, options) => {
  return MatchRecords.udpateOne(query, update, options)
    .then(
      (result) => {
        if (result) {
          return fetchMatchRecord(res, query)
        }
      },
      (err) => handleErrorResponse(res, `Error updating user match record => ${err}`, 500),
    );
}

module.exports = updateUserMatchRecord;
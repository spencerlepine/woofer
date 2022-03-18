const fetchMatchRecord = require("../fetchMatchRecord")  
   
const controllerHelpers = require('../../helpers')

const updateUserMatchRecord = ({
  DATA_KEYS,
  models: { MatchRecords },
  handleErrorResponse
}) => (
  (res, query, update, options) => {
    if (res === undefined || query === undefined || update  === undefined || options === undefined) {
      const err = 'updateUserMatchDocument called with invalid arguments'
      const failPromise = new Promise((resolve, reject) => {
        reject(err);
      })
      return failPromise
    }
    
    return MatchRecords.updateOne(query, update, options).then(
      (result) => {
        if (result) {
          return fetchMatchRecord(res, query)
        }
      },
      (err) =>
        handleErrorResponse(res, `Error updating user match record => ${err}`, 500)
    )
  }
)

module.exports = updateUserMatchRecord(controllerHelpers)

const controllerHelpers = require('../../helpers')

const fetchUserDocument = require("../fetchUserDocument")

const updateUserDocument = ({
  models: { DogUser },
  handleErrorResponse
}) => (res, query, update, options) => {
  if (res === undefined || query === undefined || update  === undefined || options === undefined) {
    const err = 'updateUserDocument called with invalid arguments'
    const failPromise = new Promise((resolve, reject) => {
      reject(err);
    })
    return failPromise
  }
  
  return DogUser.updateOne(query, update, options).then(
    (result) => {
      if (result) {
        return fetchUserDocument(res, query)
      } else {
        res.status(409).json("Unable to update user record!")
      }
    },
    (err) =>
      handleErrorResponse(res, `Unable to update user document => ${err}`, 500)
  )
}

module.exports = updateUserDocument(controllerHelpers)

const controllerHelpers = require("../../helpers")

const deleteUserDocument =
  ({ models: { DogUser }, handleErrorResponse }) =>
  (res, query, options) => {
    if (res === undefined || query === undefined || options === undefined) {
      const err = "deleteUserDocument called with invalid arguments"
      const failPromise = new Promise((resolve, reject) => {
        reject(err)
      })
      return failPromise
    }

    return DogUser.deleteOne(query, options).then(
      (result) => {
        return result
      },
      (err) =>
        handleErrorResponse(res, `Unable to delete user document => ${err}`, 500)
    )
  }

module.exports = deleteUserDocument(controllerHelpers)

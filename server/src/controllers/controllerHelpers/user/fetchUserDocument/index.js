const controllerHelpers = require("../../helpers")

const fetchUserDocument =
  ({ models: { DogUser }, handleErrorResponse }) =>
  (res, query) => {
    if (res === undefined || query === undefined) {
      const err = "fetchUserDocument called with invalid arguments"
      const failPromise = new Promise((resolve, reject) => {
        reject(err)
      })
      return failPromise
    }

    return DogUser.findOne(query).then(
      (result) => {
        if (result) {
          return result
        }

        res.status(409).json("Profile not found")
        return {}
      },
      (err) =>
        handleErrorResponse(res, `Unable to find user document => ${err}`, 500)
    )
  }

module.exports = fetchUserDocument(controllerHelpers)

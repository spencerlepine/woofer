const DogUser = require("../../models/DogUser")
const handleErrorResponse = require("../handleErrorResponse")

const fetchUserDocument = (res, query) => {
  return DogUser.findOne(query).then(
    (result) => {
      if (result) {
        return result
      } else {
        res.status(409).json("Profile not found")
      }
    },
    (err) => handleErrorResponse(res, `Unable to find user document => ${err}`, 500)
  )
}

module.exports = fetchUserDocument

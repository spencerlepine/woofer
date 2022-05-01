const {
  getModelDocumentById,
  updateModelDocumentById,
  createModelDocumentById,
  // deleteModelDocumentById
} = require("../../../models/modelHelpers")

const addZipCodeToProfile = require("../addZipCodeToProfile")

const addUserZipCode = (req, res) => {
  const reqQuery = typeof req.query === "object" ? req.query : {}
  const reqBody = typeof req.body === "object" ? req.body : {}

  const userId = reqBody["userId"] || reqQuery["userId"]
  const newZipcode = reqBody["zipcode"] || reqQuery["zipcode"]

  return addZipCodeToProfile(userId, newZipcode)
    .then(() => getModelDocumentById("ZipcodePool", "zipcodeId", newZipcode))
    .then((zipcodePool) => {
      if (zipcodePool && zipcodePool["zipcodeId"]) {
        return zipcodePool
      } else {
        return createModelDocumentById("ZipcodePool", "zipcodeId", newZipcode, {
          zipcodeId: newZipcode,
          zipcodeUsers: {},
        })
      }
    })
    .then((zipcodePool) => {
      const { zipcodeUsers } = zipcodePool

      const newUsers = new Object(zipcodeUsers)
      newUsers[userId] = 1

      const updatedPool = {
        zipcodeUsers: newUsers,
      }

      return updateModelDocumentById(
        "ZipcodePool",
        "zipcodeId",
        newZipcode,
        updatedPool
      )
    })
    .then(() => {
      res.status(201).json({
        message: "Added user to zipcode pool",
      })
    })
    .catch((err) =>
      res.status(500).json({
        message: "Unable to add user to zipcode",
        error: err,
      })
    )
}

module.exports = addUserZipCode

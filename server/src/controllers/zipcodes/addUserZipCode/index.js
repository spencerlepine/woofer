const {
  getModelDocumentById,
  updateModelDocumentById,
  // deleteModelDocumentById
} = require("../../../models/modelHelpers")

const addZipCodeToProfile = require("../addZipCodeToProfile")

const addUserZipCode = (req, res) => {
  const userId = req.body["userId"] || req.query["userId"]
  const newZipcode = req.body["zipcode"] || req.query["zipcode"]

  return addZipCodeToProfile(userId, newZipcode)
    .then(() => getModelDocumentById("ZipcodePool", "zipcodeId", newZipcode))
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

const {
  getModelDocumentById,
  updateModelDocumentById,
  // deleteModelDocumentById
} = require("../../../models/modelHelpers")

const removeZipCodeFromProfile = require("../removeZipCodeFromProfile")

const removeUserZipCode = (req, res) => {
  const userId = req.body["userId"] || req.query["userId"]
  const oldZipcode = req.body["zipcode"] || req.query["zipcode"]

  return removeZipCodeFromProfile(userId, oldZipcode)
    .then(() => getModelDocumentById("ZipcodePool", "zipcodeId", oldZipcode))
    .then((zipcodePool) => {
      const { zipcodeUsers } = zipcodePool

      const newUsers = new Object(zipcodeUsers)
      delete newUsers[userId]

      const updatedPool = {
        zipcodeUsers: newUsers,
      }

      return updateModelDocumentById(
        "ZipcodePool",
        "zipcodeId",
        oldZipcode,
        updatedPool
      )
    })
    .then(() => {
      res.status(200).json({
        message: "Removed user to zipcode pool",
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: "Unable to remove user from zipcode",
        error: err,
      })
    })
}

module.exports = removeUserZipCode

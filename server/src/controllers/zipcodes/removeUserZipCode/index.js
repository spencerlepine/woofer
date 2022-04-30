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
        newZipcode,
        updatedPool
      )
    })
}

module.exports = removeUserZipCode

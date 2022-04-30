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
}

module.exports = addUserZipCode

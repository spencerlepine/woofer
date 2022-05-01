const {
  getModelDocumentById,
  updateModelDocumentById,
  createModelDocumentById,
  // deleteModelDocumentById
} = require("../../../models/modelHelpers")

const addZipCodeToProfile = require("../addZipCodeToProfile")

const userToZipPoolDoc = (userId, newZipcode) => {
  return addZipCodeToProfile(userId, newZipcode)
    .then(() => getModelDocumentById("ZipcodePool", "zipcodeId", newZipcode))
    .then((zipcodePoolDoc) => {
      if (zipcodePoolDoc && zipcodePoolDoc["error"] === undefined) {
        return zipcodePoolDoc
      } else {
        const newDoc = {
          zipcodeUsers: {},
        }
        return createModelDocumentById(
          "ZipcodePool",
          "zipcodeId",
          newZipcode,
          newDoc
        ).then(() => getModelDocumentById("ZipcodePool", "zipcodeId", newZipcode))
      }
    })
    .then((zipcodePoolDoc) => {
      const { zipcodeUsers } = zipcodePoolDoc

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
module.exports = userToZipPoolDoc

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
      if (zipcodePoolDoc && zipcodePoolDoc["zipcodeUsers"]) {
        const { zipcodeUsers } = zipcodePoolDoc

        const newUsers = Object.assign(zipcodeUsers)
        newUsers[userId] = 1

        const updatedPool = {
          zipcodeId: newZipcode,
          zipcodeUsers: newUsers,
        }

        return updateModelDocumentById(
          "ZipcodePool",
          "zipcodeId",
          newZipcode,
          updatedPool
        )
      } else {
        const newDoc = {
          zipcodeId: newZipcode,
          zipcodeUsers: {
            [userId]: 1,
          },
        }
        return createModelDocumentById(
          "ZipcodePool",
          "zipcodeId",
          newZipcode,
          newDoc
        )
      }
    })
}
module.exports = userToZipPoolDoc

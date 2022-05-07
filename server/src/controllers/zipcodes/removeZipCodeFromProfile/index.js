const {
  getModelDocumentById,
  // createModelDocumentById,
  updateModelDocumentById,
  // deleteModelDocumentById
} = require("../../../models/modelHelpers")

const filterZips = (userZipcodes, oldZipcode) => {
  const zipcodes = new Set(userZipcodes)
  zipcodes.delete(oldZipcode)
  return Array.from(zipcodes)
}

const removeZipCodeFromProfile = (userId, oldZipcode) => {
  return getModelDocumentById("DogUser", "userId", userId)
    .then((userProfile) => {
      if (userProfile && userProfile["userId"]) {
        const newProfile = Object.assign(userProfile)

        let validZips = []
        const { zipcodes } = newProfile
        if (zipcodes) {
          validZips = zipcodes
        }

        const updatedZipcodes = filterZips(validZips, oldZipcode)

        newProfile["zipcodes"] = updatedZipcodes
        return updateModelDocumentById("DogUser", "userId", userId, newProfile)
      } else {
        return {}
      }
    })
    .then(() => getModelDocumentById("ZipcodePool", "zipcodeId", oldZipcode))
    .then((zipcodePoolDoc) => {
      if (zipcodePoolDoc && zipcodePoolDoc["zipcodeUsers"]) {
        const { zipcodeUsers } = zipcodePoolDoc

        const newUsers = Object.assign(zipcodeUsers)
        delete newUsers[userId]

        const updatedPool = {
          zipcodeId: oldZipcode,
          zipcodeUsers: newUsers,
        }

        return updateModelDocumentById(
          "ZipcodePool",
          "zipcodeId",
          oldZipcode,
          updatedPool
        )
      }
    })
    .then(() => getModelDocumentById("DogUser", "userId", userId))
}

module.exports = removeZipCodeFromProfile

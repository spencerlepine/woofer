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
  return getModelDocumentById("DogUser", "userId", thisUserId).then(
    (userProfile) => {
      const { zipcodes } = userProfile

      const updatedZipcodes = filterZips(zipcodes || [], oldZipcode)

      const updatedProfile = {
        ...userProfile,
        zipcodes: updatedZipcodes,
      }

      return updateModelDocumentById("DogUser", "userId", thisUserId, updatedProfile)
    }
  )
}

module.exports = removeZipCodeFromProfile

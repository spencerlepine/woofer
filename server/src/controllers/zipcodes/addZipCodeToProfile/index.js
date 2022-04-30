const {
  getModelDocumentById,
  // createModelDocumentById,
  updateModelDocumentById,
  // deleteModelDocumentById
} = require("../../../models/modelHelpers")

const filterZips = (userZipcodes, newZipcode) => {
  const extendedZipCodes = [...userZipcodes, newZipcode]
  return Array.from(new Set(extendedZipCodes))
}

const addZipCodeToProfile = (userId, newZipcode) => {
  return getModelDocumentById("DogUser", "userId", thisUserId).then(
    (userProfile) => {
      const { zipcodes } = userProfile

      const updatedZipcodes = filterZips(zipcodes || [], newZipcode)

      const updatedProfile = {
        ...userProfile,
        zipcodes: updatedZipcodes,
      }

      return updateModelDocumentById("DogUser", "userId", thisUserId, updatedProfile)
    }
  )
}

module.exports = addUserZipCode

const {
  getModelDocumentById,
  // createModelDocumentById,
  updateModelDocumentById,
  // deleteModelDocumentById
} = require("../../../models/modelHelpers")

const filterZips = (userZipcodes, newZipcode) => {
  const extendedZipCodes = [...userZipcodes, newZipcode]
  const zipcodesSet = new Set(extendedZipCodes)
  return Array.from(zipcodesSet)
}

const addZipCodeToProfile = (userId, newZipcode) => {
  return getModelDocumentById("DogUser", "userId", userId).then((userProfile) => {
    let validZips = []
    const { zipcodes } = userProfile
    if (zipcodes) {
      validZips = zipcodes
    }

    const updatedZipcodes = filterZips(validZips, newZipcode)

    const updatedProfile = {
      ...userProfile,
      zipcodes: updatedZipcodes,
    }

    return updateModelDocumentById("DogUser", "userId", userId, updatedProfile)
  })
}

module.exports = addZipCodeToProfile

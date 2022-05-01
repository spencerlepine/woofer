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
    const newProfile = new Object(userProfile)

    let validZips = []
    const { zipcodes } = newProfile
    if (zipcodes) {
      validZips = zipcodes
    }

    const updatedZipcodes = filterZips(validZips, newZipcode)

    newProfile["zipcodes"] = updatedZipcodes

    return updateModelDocumentById("DogUser", "userId", userId, newProfile)
  })
}

module.exports = addZipCodeToProfile

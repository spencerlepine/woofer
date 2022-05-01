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
  return getModelDocumentById("DogUser", "userId", userId).then((userProfile) => {
    const newProfile = new Object(userProfile)

    let validZips = []
    const { zipcodes } = newProfile
    if (zipcodes) {
      validZips = zipcodes
    }

    const updatedZipcodes = filterZips(validZips, oldZipcode)

    newProfile["zipcodes"] = updatedZipcodes

    return updateModelDocumentById("DogUser", "userId", userId, newProfile)
  })
}

module.exports = removeZipCodeFromProfile

const {
  getModelDocumentById,
  // createModelDocumentById,
  // updateModelDocumentById,
  // deleteModelDocumentById
} = require("../../../models/modelHelpers")

const filterUserProfile = require("../filterUserProfile")

const getUserProfile = (req, res) => {
  const { userId } = req.query

  return getModelDocumentById("DogUser", "userId", userId)
    .then((userProfile) => {
      const filteredProfile = filterUserProfile(userProfile)

      res.status(200).json({
        userProfile: filteredProfile,
      })
    })
    .catch((err) =>
      res.status(500).json({
        message: "Unable to find user profile",
        error: JSON.stringify(err),
      })
    )
}

module.exports = getUserProfile

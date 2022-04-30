const {
  getModelDocumentById,
  // createModelDocumentById,
  // updateModelDocumentById,
  // deleteModelDocumentById
} = require("../../../models/modelHelpers")

const filterUserProfile = require("../filterUserProfile")

const getUserProfile = (req, res) => {
  const reqQuery = typeof req.query === "object" ? req.query : {}
  const { userId } = reqQuery

  return getModelDocumentById("DogUser", "userId", userId)
    .then((userProfile) => {
      const filteredProfile = filterUserProfile(userProfile)

      res.status(200).json({
        userProfile: filteredProfile,
      })
    })
    .catch((err) =>
      res.status(500).json({
        userProfile: {},
        message: "Unable to find user profile",
        error: JSON.stringify(err),
      })
    )
}

module.exports = getUserProfile

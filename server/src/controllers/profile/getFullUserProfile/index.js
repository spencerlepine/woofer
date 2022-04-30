const { getModelDocumentById } = require("../../../models/modelHelpers")

const getFullUserProfile = (req, res) => {
  const { userId } = req.query

  return getModelDocumentById("DogUser", "userId", userId)
    .then((userProfile) => {
      res.status(200).json({
        userProfile: userProfile,
      })
    })
    .catch((err) =>
      res.status(500).json({
        message: "Unable to find user profile",
        error: JSON.stringify(err),
      })
    )
}

module.exports = getFullUserProfile

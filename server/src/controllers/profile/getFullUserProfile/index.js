const { getModelDocumentById } = require("../../../models/modelHelpers")

const getFullUserProfile = (req, res) => {
  const reqQuery = typeof req.query === "object" ? req.query : {}
  const { userId } = reqQuery

  return getModelDocumentById("DogUser", "userId", userId)
    .then((userProfile) => {
      res.status(200).json({
        userProfile: userProfile,
      })
    })
    .catch((err) =>
      res.status(500).json({
        userProfile: {},
        message: "Unable to find user profile",
        error: err,
      })
    )
}

module.exports = getFullUserProfile

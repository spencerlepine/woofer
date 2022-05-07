const { updateModelDocumentById } = require("../../../models/modelHelpers")

const updateUserProfile = (req, res) => {
  const updatedProfile = req.body
  const { userId } = updatedProfile

  return updateModelDocumentById("DogUser", "userId", userId, updatedProfile)
    .then((userProfile) => {
      res.status(201).json({
        userProfile: userProfile,
      })
    })
    .catch((err) =>
      res.status(500).json({
        message: "Unable to update user profile",
        error: err,
      })
    )
}

module.exports = updateUserProfile

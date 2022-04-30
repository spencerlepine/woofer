const { deleteModelDocumentById } = require("../../../models/modelHelpers")

const deleteUserProfile = (req, res) => {
  const { userId } = req.query

  return deleteModelDocumentById("DogUser", "userId", userId)
    .then(() => {
      res.status(200).json({
        message: "Successfully deleted user profile",
      })
    })
    .catch((err) =>
      res.status(500).json({
        message: "Unable to update user profile",
        error: JSON.stringify(err),
      })
    )
}

module.exports = deleteUserProfile

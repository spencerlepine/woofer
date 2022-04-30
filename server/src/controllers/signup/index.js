const { createModelDocumentById } = require("../../models/modelHelpers")

const polyFillUser = require("./polyFillUser")

module.exports = {
  signupUser: (req, res) => {
    const userProfile = req.body
    const { userId } = userProfile

    const filteredProfile = polyFillUser(userProfile)

    return createModelDocumentById("DogUser", "userId", userId, filteredProfile)
      .then((userProfile) => {
        res.status(201).json({
          userProfile: userProfile,
        })
      })
      .catch((err) =>
        res.status(500).json({
          message: "Unable to create user profile",
          error: JSON.stringify(err),
        })
      )
  },
}

const { createModelDocumentById } = require("../../models/modelHelpers")

const polyFillUser = require("./polyFillUser")

module.exports = {
  signupUser: (req, res) => {
    const userProfile = req.body
    const { userId } = userProfile

    const filteredProfile = polyFillUser(userProfile)
    const newProfile = {
      ...filteredProfile,
      userId: userId,
    }

    return createModelDocumentById("DogUser", "userId", userId, newProfile)
      .then((userProfile) => {
        res.status(201).json({
          userProfile: userProfile,
        })
      })
      .catch((err) =>
        res.status(500).json({
          message: "Unable to create user profile",
          error: err,
        })
      )
  },
}

const { getModelDocumentById } = require("../../../models/modelHelpers")

const fetchUserChats = (req, res) => {
  const { userId } = req.query

  return getModelDocumentById("DogUser", "userId", userId)
    .then((userRecord) => {
      res.status(200).json({
        chats: userRecord["chats"],
      })
    })
    .catch((err) =>
      res.status(500).json({
        chats: [],
        message: "Unable to fetch user chats",
        error: err,
      })
    )
}

module.exports = fetchUserChats

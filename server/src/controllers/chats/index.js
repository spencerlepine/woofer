const addChatIdToUserProfile = require("../controllerHelpers/chats/addChatIdToUserProfile")
const generateTwoUserChat = require("../controllerHelpers/chats/generateTwoUserChat")

const { DATA_KEYS } = require("../../../config/constants")
const idKey = DATA_KEYS["USER_ID"]

module.exports = {
  addUserToChat: (req, res) => {
    const { thisUserId, thatUserId } = req.body

    generateTwoUserChat()
      .then((chatId) => {
        const thisChatObj = {
          [DATA_KEYS["CHAT_ID"]]: chatId,
          otherUserId: thatUserId,
        }

        const thatChatObj = {
          [DATA_KEYS["CHAT_ID"]]: chatId,
          otherUserId: thisUserId,
        }

        return addChatIdToUserProfile(
          res,
          thisUserId,
          thisChatObj,
          DATA_KEYS["USER_ID"]
        )
          .then(() => {
            return addChatIdToUserProfile(
              res,
              thatUserId,
              thatChatObj,
              DATA_KEYS["USER_ID"]
            )
          })
          .then(() => chatId)
      })
      .then((chatId) => {
        res.status(201).send({ [DATA_KEYS["CHAT_ID"]]: chatId })
      })
  },
  fetchUserChats: (req, res) => {
    // const endpointObj = {
    //   endpointPathKeys: ["CHATS", "FETCH"],
    //   method: "GET",
    // }

    const { [DATA_KEYS["USER_ID"]]: userId } = req.query

    fetchUserChatList(res, userId)
      .then((chatRecord) => {
        res.status(200).json(chatRecord)
      })
      .catch((err) =>
        res.status(500).json({
          message: "Unable to fetch user match queue!",
          error: JSON.stringify(err),
        })
      )
  },
}

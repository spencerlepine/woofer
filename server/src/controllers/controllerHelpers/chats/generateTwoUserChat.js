const controllerHelpers = require("../helpers")

const generateTwoUserChat =
  ({
    DATA_KEYS,
    // models: { Chats },
    handleErrorResponse,
  }) =>
  () => {
    // TODO
    return Promise.resolve({ chat_id: "12345" })
  }

module.exports = generateTwoUserChat

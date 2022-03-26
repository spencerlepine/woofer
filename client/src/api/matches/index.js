import axios from "axios"
import constants from "config/constants"
const { endpointURLStr } = constants

export const postUserSwipe = (body, callback) => {
  const url = endpointURLStr(["MATCHES", "SWIPE"], "POST")

  axios
    .post(url, body)
    .then((response) => {
      const {
        [DATA_KEYS["CHAT_ID"]]: chatId,
        [DATA_KEYS["USER_PROFILE"]]: userProfile,
      } = response.data

      callback({ chatId, userProfile })
    })
    .catch((err) => {
      console.error(err)
    })
}

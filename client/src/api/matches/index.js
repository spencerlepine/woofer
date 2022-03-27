import axios from "axios"
import config from "config/config"
import constants from "config/constants"
const { endpointURLStr } = constants
const { SERVER_URL } = config
import createNotif from "components/ui/NotificationsPopup"

export const postUserSwipe = (body, callback) => {
  const url = endpointURLStr(["MATCHES", "SWIPE"], "POST")

  axios
    .post(SERVER_URL + url, body)
    .then((response) => {
      const {
        [DATA_KEYS["CHAT_ID"]]: chatId,
        [DATA_KEYS["USER_PROFILE"]]: userProfile,
      } = response.data

      callback({ chatId, userProfile })
    })
    .catch((error) => {
      createNotif(error)
      console.log(error)
    })
}

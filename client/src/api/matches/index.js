import axios from "axios"
import config from "config/config"
import constants from "config/constants"
const { endpointURLStr, DATA_KEYS } = constants
const { SERVER_URL } = config
import createNotif from "components/ui/NotificationsPopup"

export const postUserSwipe = (body, successCallback, failCallback = () => {}) => {
  const url = endpointURLStr(["MATCHES", "SWIPE"], "POST")

  axios
    .post(SERVER_URL + url, body)
    .then((response) => {
      const {
        [DATA_KEYS["CHAT_ID"]]: chatId,
        [DATA_KEYS["USER_PROFILE"]]: userProfile,
      } = response.data

      successCallback({ chatId, userProfile })
    })
    .catch((error) => {
      createNotif(error)
      failCallback(error)
    })
}

export const generateUserSwipe = (
  params,
  successCallback,
  failCallback = () => {}
) => {
  const url = endpointURLStr(["MATCHES", "GENERATE"], "GET")

  axios
    .get(SERVER_URL + url, { params })
    .then((response) => {
      const { [DATA_KEYS["USER_PROFILE"]]: userProfile } = response.data
      successCallback(userProfile)
    })
    .catch((error) => {
      console.log(error)
      createNotif(error)
      failCallback(error)
    })
}

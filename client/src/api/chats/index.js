import axios from "axios"
import { auth } from "config/firebase"
import createNotif from "components/ui/NotificationsPopup"
import config from "config/config"
const { SERVER_URL } = config
import constants from "config/constants"
const { endpointURLStr, DATA_KEYS } = constants

export const createChat = (
  thisUserId,
  thatUserId,
  successCallback = () => {},
  failCallback = () => {}
) => {
  axios
    .post(SERVER_URL + "/api/chats/create", { thisUserId, thatUserId })
    .then((response) => {
      successCallback()
    })
    .catch((error) => {
      createNotif(error)
      failCallback(error)
    })
}

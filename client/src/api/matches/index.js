import axios from "axios"
import config from "config/config"
const { SERVER_URL } = config
import createNotif from "components/ui/NotificationsPopup"

export const postUserSwipe = (body, successCallback, failCallback = () => {}) => {
  const url = "/api/matches/swipe"

  axios
    .post(SERVER_URL + url, body)
    .then((response) => {
      const { chatId: chatId, userProfile: userProfile } = response.data

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
  const url = "/api/matches/generate"

  axios
    .get(SERVER_URL + url, { params })
    .then((response) => {
      const { userProfile } = response.data
      successCallback(userProfile)
    })
    .catch((error) => {
      console.log(error)
      createNotif(error)
      failCallback(error)
    })
}

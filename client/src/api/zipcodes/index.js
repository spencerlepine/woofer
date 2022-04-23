import axios from "axios"
import { auth } from "config/firebase"
import createNotif from "components/ui/NotificationsPopup"
import config from "config/config"
const { SERVER_URL } = config
import constants from "config/constants"
const { endpointURLStr, DATA_KEYS } = constants

export const removeUserFromZipcode = (
  oldZipCode,
  successCallback,
  failCallback = () => {}
) => {
  if (auth && auth.currentUser) {
    const { uid } = auth.currentUser
    const url = endpointURLStr(["ZIPCODES", "REMOVE"], "DELETE")
    const params = {
      [DATA_KEYS["USER_ID"]]: uid,
      [DATA_KEYS["ZIPCODE"]]: oldZipCode,
    }

    axios
      .delete(SERVER_URL + url, { params })
      .then((response) => {
        successCallback()
      })
      .catch((error) => {
        createNotif(error)
        failCallback(error)
      })
  }
}

export const addUserToZipcode = (
  newZipCode,
  successCallback,
  failCallback = () => {}
) => {
  if (auth && auth.currentUser) {
    const { uid } = auth.currentUser
    const url = endpointURLStr(["ZIPCODES", "ADD"], "POST")
    const body = {
      [DATA_KEYS["USER_ID"]]: uid,
      [DATA_KEYS["ZIPCODE"]]: newZipCode,
    }

    axios
      .post(SERVER_URL + url, body)
      .then((response) => {
        successCallback()
      })
      .catch((error) => {
        createNotif(error)
        failCallback(error)
      })
  }
}
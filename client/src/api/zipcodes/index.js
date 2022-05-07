import axios from "axios"
import { auth } from "config/firebase"
import createNotif from "components/ui/NotificationsPopup"
import config from "config/config"
const { SERVER_URL } = config

export const removeUserFromZipcode = (
  oldZipCode,
  successCallback,
  failCallback = () => {}
) => {
  if (auth && auth.currentUser) {
    const { uid } = auth.currentUser
    const url = "/api/zipcodes/remove"
    const params = {
      userId: uid,
      zipcode: oldZipCode,
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

    const url = "/api/zipcodes/add"
    const body = {
      ["userId"]: uid,
      zipcode: newZipCode,
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

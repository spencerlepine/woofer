import axios from "axios"
import config from "config/config"
const { SERVER_URL } = config

export const fetchServerStatus = (callback) => {
  axios
    .get(SERVER_URL + "/api/status")
    .then((response) => {
      if (response && response.data && response.data.status) {
        const { status } = response.data
        const isRunning = status === "running"
        callback(isRunning)
      } else {
        callback(true, "")
      }
    })
    .catch((error) => {
      callback(false, JSON.stringify(error))
      console.error(error)
      createNotif(error)
    })
}

import axios from "axios"
import config from "config/config"
const { SERVER_URL } = config

export const fetchServerStatus = (callback) => {
  axios
    .get(SERVER_URL + "/api/status")
    .then((response) => {
      if (response && response.data && response.data.status) {
        const { status, mongo } = response.data
        const isRunning = status === "running"
        const mongoIsRunning = mongo === "running"
        callback(isRunning, mongoIsRunning)
      } else {
        callback(false, false, "")
      }
    })
    .catch((error) => {
      callback(false, false, JSON.stringify(error))
      console.error(error)
    })
}

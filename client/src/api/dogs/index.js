import axios from "axios"

const baseURL = "https://dog.ceo/api/"

const fetchAllPuppies = (requestBody, callback) => {
  axios
    .get(baseURL + "/puppies", requestBody)
    .then((response) => {
      callback(response.data)
    })
    .catch((err) => {
      console.error(`Failed to load /puppies`, err)
    })
}

const addPuppyToList = (newPuppy, callback) => {
  axios
    .post(baseURL + "/puppies", newPuppy)
    .then((response) => {
      callback(response.data)
    })
    .catch((err) => {
      console.error(`Failed to load /puppies`, err)
    })
}

const apiFunctions = {
  fetchAllPuppies,
  addPuppyToList,
}

export default apiFunctions

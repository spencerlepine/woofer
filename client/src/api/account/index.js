import axios from "axios"
import { auth, storage } from "config/firebase"
import createNotif from "components/ui/NotificationsPopup"
import config from "config/config"
const { SERVER_URL } = config
import constants from "config/constants"
const { endpointURLStr, DATA_KEYS } = constants
import { mockUser, mockUserB } from "./mockUser"

export const checkLoginStatus = (successCb) => {
  if (auth) {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        successCb(user)
      }
    })
  }
}

export const signInWithEmailAndPassword = (email, password, successCb) => {
  return auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      successCb(userCredential.user)
    })
    .catch((error) => console.log(error))
}

export const createUserWithEmailAndPassword = (
  displayName,
  email,
  password,
  userData,
  successCb
) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user

      user.updateProfile({
        displayName: displayName,
      })
      return userCredential.user
    })
    .then((user) => {
      const url = endpointURLStr(["SIGNUP"], "POST")

      const dataWithUid = {
        ...userData,
        ["userId"]: user.uid,
      }

      return axios.post(SERVER_URL + url, dataWithUid)
    })
    .then((response) => {
      successCb(response.data)
    })
    .catch((error) => {
      createNotif(error)
      console.log(error)
    })
}

export const fetchUserProfileRecord = (successCb, failCallback = () => {}) => {
  if (auth && auth.currentUser) {
    const { uid } = auth.currentUser
    const url = endpointURLStr(["PROFILE", "DETAILS"], "GET")
    const params = {
      ["userId"]: uid,
    }

    axios
      .get(SERVER_URL + url, { params })
      .then((response) => {
        const { [DATA_KEYS["USER_PROFILE"]]: userProfile } = response.data
        successCb(userProfile)
      })
      .catch((error) => {
        createNotif(error)
        failCallback(error)
      })
  }
}

export const fetchUserProfile = (userId, successCb, failCallback = () => {}) => {
  const url = endpointURLStr(["PROFILE", "DETAILS"], "GET")
  const params = {
    ["userId"]: userId,
  }

  axios
    .get(SERVER_URL + url, { params })
    .then((response) => {
      const { userProfile } = response.data
      successCb(userProfile)
    })
    .catch((error) => {
      createNotif(error)
      failCallback(error)
    })
}

export const fetchProfileRecord = (userId, successCb, failCallback = () => {}) => {
  const url = endpointURLStr(["PROFILE", "DETAILS"], "GET")
  const params = {
    ["userId"]: userId,
  }

  axios
    .get(SERVER_URL + url, { params })
    .then((response) => {
      const { [DATA_KEYS["USER_PROFILE"]]: userProfile } = response.data
      successCb(userProfile)
    })
    .catch((error) => {
      createNotif(error)
      failCallback(error)
    })
}

export const updateUserProfileRecord = (
  newDetails,
  successCb,
  failCallback = () => {}
) => {
  if (auth && auth.currentUser) {
    const url = endpointURLStr(["PROFILE", "DETAILS"], "POST")

    axios
      .post(SERVER_URL + url, newDetails)
      .then((response) => {
        const { [DATA_KEYS["USER_PROFILE"]]: userProfile } = response.data

        successCallback({ userProfile })
      })
      .catch((error) => {
        createNotif(error)
        failCallback(error)
      })
  }
}

export const deleteAccount = (userId, successCallback, failCallback = () => {}) => {
  if (auth && auth.currentUser) {
    const url = "/api/profile/delete"
    const params = { userId }

    auth.deleteUser(userId).then(() =>
      axios
        .delete(SERVER_URL + url, { params })
        .then((response) => {
          successCallback()
        })
        .catch((error) => {
          createNotif(error)
          failCallback(error)
        })
    )
  }
}

export const signOut = () => {
  return auth.signOut().catch((error) => console.log(error))
}

export const sendPasswordResetEmail = (email, successCb = () => {}) => {
  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      successCb(true)
    })
    .catch((error) => console.log(error))
}

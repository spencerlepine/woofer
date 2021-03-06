import axios from "axios"
import { auth } from "config/firebase"
import createNotif from "components/ui/NotificationsPopup"
import config from "config/config"
const { SERVER_URL } = config

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
      console.error(error)
      createNotif(error)
      failCallback(error)
    })
}

export const fetchAllUserChats = (
  userId,
  successCallback,
  failCallback = () => {}
) => {
  const params = { ["userId"]: userId }

  axios
    .get(SERVER_URL + "/api/chats/fetch", { params })
    .then((response) => {
      successCallback(response.data)
    })
    .catch((error) => {
      console.error(error)
      createNotif(error)
      failCallback(error)
    })
}

export const fetchChatHistory = (
  chatId,
  successCallback,
  failCallback = () => {}
) => {
  const params = { chatId: chatId }

  axios
    .get(SERVER_URL + "/api/chats/history", { params })
    .then((response) => {
      const { data } = response
      const { chatMessages } = data
      successCallback(chatMessages || [])
    })
    .catch((error) => {
      console.error(error)
      createNotif(error)
      failCallback(error)
    })
}

export const removeUserFromChat = (
  thisUserId,
  thatUserId,
  chatId,
  successCallback,
  failCallback = () => {}
) => {
  const params = { thisUserId, thatUserId, chatId }

  axios
    .delete(SERVER_URL + "/api/chats/delete", { params })
    .then((response) => {
      successCallback(response.data)
    })
    .catch((error) => {
      console.error(error)
      createNotif(error)
      failCallback(error)
    })
}

export const fetchLastChatMessage = (
  chatId,
  successCallback,
  failCallback = () => {}
) => {
  const params = { chatId }

  axios
    .get(SERVER_URL + "/api/chats/last", { params })
    .then((response) => {
      const { data } = response
      const { message } = data
      successCallback(message || {})
    })
    .catch((error) => {
      console.error(error)
      createNotif(error)
      failCallback(error)
    })
}

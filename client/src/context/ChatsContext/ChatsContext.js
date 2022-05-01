import React, { useState, useContext } from "react"
import PropTypes from "prop-types"
import * as chatsAPI from "api/chats"

import constants from "config/constants"
const { DATA_KEYS } = constants
const idKey = DATA_KEYS["USER_ID"]

export const ChatsContext = React.createContext()

export const ChatsProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [availableChats, setAvailableChats] = useState([])

  const fetchUserChats = (userId) => {
    setLoading(true)
    chatsAPI.fetchAllUserChats(userId, ({ chats }) => {
      setAvailableChats(chats)
      setLoading(false)
    })
  }

  const value = {
    availableChats,
    loading,
    fetchUserChats,
  }

  return <ChatsContext.Provider value={value}>{children}</ChatsContext.Provider>
}

const useChats = () => useContext(ChatsContext)

export default useChats

ChatsProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

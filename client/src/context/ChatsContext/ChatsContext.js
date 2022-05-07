import React, { useState, useContext } from "react"
import PropTypes from "prop-types"
import * as chatsAPI from "api/chats"
import * as userAPI from "api/account"

const idKey = "userId"

export const ChatsContext = React.createContext()

export const ChatsProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [otherUserDetails, setOtherUserDetails] = useState({})
  const [availableChats, setAvailableChats] = useState([])

  const fetchUserChats = (userId) => {
    setLoading(true)
    chatsAPI.fetchAllUserChats(userId, ({ chats }) => {
      setAvailableChats(chats)
      setLoading(false)
    })
  }

  const fetchOtherUserDetails = (userId) => {
    setLoading(true)
    userAPI.fetchUserProfile(userId, (userProfile) => {
      setOtherUserDetails(userProfile)
      setLoading(false)
    })
  }

  const value = {
    availableChats,
    loading,
    fetchUserChats,
    fetchOtherUserDetails,
    otherUserDetails,
  }

  return <ChatsContext.Provider value={value}>{children}</ChatsContext.Provider>
}

const useChats = () => useContext(ChatsContext)

export default useChats

ChatsProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

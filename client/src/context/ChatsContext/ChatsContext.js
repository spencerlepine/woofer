import React, { useState, useContext } from "react"
import PropTypes from "prop-types"

import constants from "config/constants"
const { DATA_KEYS } = constants
const idKey = DATA_KEYS["USER_ID"]

export const ChatsContext = React.createContext()

export const ChatsProvider = ({ children }) => {
  const [availableChats, setAvailableChats] = useState([])

  const value = {
    availableChats,
  }

  return <ChatsContext.Provider value={value}>{children}</ChatsContext.Provider>
}

const useChats = () => useContext(ChatsContext)

export default useChats

ChatsProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

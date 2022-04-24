import React, { useState, useContext } from "react"
import PropTypes from "prop-types"
import constants from "config/constants"
const { DATA_KEYS } = constants
import { postUserSwipe, generateUserSwipe } from "api/matches"
import MatchMadePopup from "components/ui/MatchMadePopup/MatchMadePopup"

const idKey = DATA_KEYS["USER_ID"]

export const SwiperContext = React.createContext()

export const SwiperProvider = ({ children }) => {
  const [possibleMatchUser, setPossibleMatchUser] = useState(null)
  const [swiperUserLoading, setSwiperUserLoading] = useState(false)
  const [swiperButtonLoading, setSwiperButtonLoading] = useState(false)
  const [renderMatchPopup, setRenderMatchPopup] = useState(false)

  const generateNextMatchUser = (userId) => {
    setSwiperUserLoading(true)

    const handleGenerate = (userProfile) => {
      console.log(userProfile)
      setPossibleMatchUser(userProfile)
      setSwiperUserLoading(false)
    }

    const reqParams = { [idKey]: userId }
    generateUserSwipe(reqParams, handleGenerate, () => setSwiperUserLoading(false))
  }

  const createMatchMadePopup = (chatId, userProfile) => "TODO"

  const handleSwipe = (thisUser, thatUser, swipe) => {
    let swipeChoice =
      swipe === "yes" ? DATA_KEYS["MATCH_ACCEPT"] : DATA_KEYS["MATCH_REJECT"]

    setSwiperButtonLoading(true)

    const body = {
      [DATA_KEYS["THIS_USER_ID"]]: thisUser[idKey],
      [DATA_KEYS["THAT_USER_ID"]]: thatUser[idKey],
      [DATA_KEYS["MATCH_STATUS"]]: swipeChoice,
    }

    postUserSwipe(
      body,
      ({ chatId, userProfile }) => {
        if (chatId) {
          createMatchMadePopup(chatId, userProfile)
        }
        generateNextMatchUser(thisUser[idKey])
        setSwiperButtonLoading(false)
      },
      () => setSwiperButtonLoading(false)
    )
  }

  const value = {
    swiperUserLoading,
    swiperButtonLoading,
    handleSwipe,
    possibleMatchUser,
    generateNextMatchUser,
  }

  return (
    <SwiperContext.Provider value={value}>
      {renderMatchPopup && (
        <MatchMadePopup
          closePopup={setRenderMatchPopup(false)}
          renderMe={renderMatchPopup}
        />
      )}
      {children}
    </SwiperContext.Provider>
  )
}

const useSwiper = () => useContext(SwiperContext)

export default useSwiper

SwiperProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

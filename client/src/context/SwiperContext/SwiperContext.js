import React, { useState, useContext } from "react"
import PropTypes from "prop-types"
import * as ROUTES from "config/routeConstants"
import { postUserSwipe, generateUserSwipe } from "api/matches"
import MatchMadePopup from "components/ui/MatchMadePopup/MatchMadePopup"
import { useHistory } from "react-router-dom"

const idKey = "userId"

export const SwiperContext = React.createContext()

export const SwiperProvider = ({ children }) => {
  const [possibleMatchUser, setPossibleMatchUser] = useState(null)
  const [swiperUserLoading, setSwiperUserLoading] = useState(false)
  const [swiperButtonLoading, setSwiperButtonLoading] = useState(false)
  const [renderMatchPopup, setRenderMatchPopup] = useState(false)
  const [matchMadeUser, setMatchMadeUser] = useState(null)

  const history = useHistory()

  const generateNextMatchUser = (userId) => {
    setSwiperUserLoading(true)
    setPossibleMatchUser(() => null)

    const handleGenerate = (userProfile) => {
      if (userProfile) {
        setPossibleMatchUser(userProfile)
      }
      setSwiperUserLoading(false)
    }

    const reqParams = { [idKey]: userId }
    generateUserSwipe(reqParams, handleGenerate, () => setSwiperUserLoading(false))
  }

  const createMatchMadePopup = (chatId, userId) => {
    history.push(`${ROUTES.MATCH}/${userId}/${chatId}`)
  }

  const handleSwipe = (thisUser, thatUser, swipe) => {
    let swipeChoice = swipe === "yes" ? "accept" : "reject"

    setSwiperButtonLoading(true)
    setPossibleMatchUser(() => null)

    const body = {
      thisUserId: thisUser[idKey],
      thatUserId: thatUser[idKey],
      matchStatus: swipeChoice,
    }

    postUserSwipe(
      body,
      ({ chatId, userProfile }) => {
        if (chatId && chatId !== "none") {
          createMatchMadePopup(chatId, thatUser[idKey])
        }
        setSwiperButtonLoading(false)
      },
      () => setSwiperButtonLoading(false)
    )

    generateNextMatchUser(thisUser[idKey])
  }

  const value = {
    swiperUserLoading,
    swiperButtonLoading,
    handleSwipe,
    setPossibleMatchUser,
    possibleMatchUser,
    generateNextMatchUser,
    matchMadeUser,
  }

  return <SwiperContext.Provider value={value}>{children}</SwiperContext.Provider>
}

const useSwiper = () => useContext(SwiperContext)

export default useSwiper

SwiperProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

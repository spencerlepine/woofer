import React from "react"
import useSwiper, { SwiperProvider } from "context/SwiperContext/SwiperContext"
import useAuth, { AuthProvider } from "context/AuthContext/AuthContext"
import SwipeButtons from "./SwipeButtons"
import ImageCarousel from "./ImageCarousel"
import UserInfo from "./UserInfo"

import constants from "config/constants"
const { DATA_KEYS } = constants
const idKey = DATA_KEYS["USER_ID"]

const extractUserImages = (userObj) => {
  const imageKey = DATA_KEYS["USER_IMAGES"]
  if (userObj && typeof userObj === "object" && userObj[imageKey]) {
    return userObj[imageKey]
  }
  return []
}

const Swiper = () => {
  const { currentUser: thisUser } = useAuth()
  const {
    swiperUserLoading: loading,
    possibleMatchUser,
    generateNextMatchUser,
  } = useSwiper()

  const images = extractUserImages(thisUser)

  const RenderInfoOrRetry = () => (
    <>
      {possibleMatchUser ? (
        <>
          <SwipeButtons thisUser={thisUser} thatUser={possibleMatchUser} />

          <ImageCarousel images={images} />

          <UserInfo user={possibleMatchUser} />
        </>
      ) : (
        <>
          <p>Unable to find possible match...</p>
          <button
            onClick={() => generateNextMatchUser(thisUser[idKey] || thisUser["uid"])}
          >
            Try Again
          </button>
        </>
      )}
    </>
  )

  return (
    <div className="swiper">
      {loading ? (
        <p>Loading... {/*TODO - LOADING SPINNER*/}</p>
      ) : (
        <RenderInfoOrRetry />
      )}
    </div>
  )
}

const WrappedSwiper = (props) => (
  <AuthProvider>
    <SwiperProvider>
      <Swiper {...props} />
    </SwiperProvider>
  </AuthProvider>
)

export default WrappedSwiper

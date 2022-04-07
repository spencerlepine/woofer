import React from "react"
import useSwiper, { SwiperProvider } from "context/SwiperContext/SwiperContext"
import useAuth, { AuthProvider } from "context/SwiperContext/SwiperContext"
import SwipeButtons from "./SwipeButtons"
import ImageCarousel from "./ImageCarousel"
import UserInfo from "./UserInfo"

import constants from "config/constants"
const { DATA_KEYS } = constants

const extractUserImages = (userObj) => {
  const imageKey = DATA_KEYS["USER_IMAGES"]
  if (typeof userObj === "object" && userObj[imageKey]) {
    return userObj[imageKey]
  }
  return []
}

const Swiper = () => {
  const { currentUser: thisUser } = useAuth()
  const { swiperUserLoading: loading, possibleMatchUser } = useSwiper()

  const images = extractUserImages(thisUser)

  const RenderInfoOrRetry = () => (
    <>
      {possibleMatchUser ? (
        <>
          <ImageCarousel images={images} />

          <UserInfo user={possibleMatchUser} />
        </>
      ) : (
        <>
          <p>Unable to find possible match...</p>
          <button>Try Again</button>
        </>
      )}
    </>
  )

  return (
    <div className="swiper">
      <SwipeButtons thisUser={thisUser} thatUser={possibleMatchUser} />

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

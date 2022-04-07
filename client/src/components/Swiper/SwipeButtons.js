import React from "react"
import PropTypes from "prop-types"
import {
  SwiperProvider,
  useSwiperContext,
} from "./context/SwiperContext/SwiperContext"

const SwipeButtons = ({ thisUser, thatUser }) => {
  const { swipeButtonLoading: loading, handleSwipe } = useSwiperContext()

  return (
    <div className="swipeButtons">
      <button
        onClick={() => handleSwipe(thisUser, thatUser, "yes")}
        disabled={loading}
      >
        YES
      </button>

      <button
        onClick={() => handleSwipe(thisUser, thatUser, "no")}
        disabled={loading}
      >
        NO
      </button>
    </div>
  )
}

const WrappedButtons = (props) => (
  <SwiperProvider>
    <SwipeButtons {...props} />
  </SwiperProvider>
)

export default WrappedButtons

SwipeButtons.propTypes = {
  thisUser: PropTypes.object.isRequired,
  thatUser: PropTypes.object.isRequired,
}

import React from "react"
import PropTypes from "prop-types"
import useSwiper, { SwiperProvider } from "context/SwiperContext/SwiperContext"

const SwipeButtons = ({ thisUser, thatUser }) => {
  const {
    swipeButtonLoading: loading,
    handleSwipe,
    setPossibleMatchUser,
  } = useSwiper()

  return (
    <div className="swipeButtons">
      <div className="section p-3 has-text-centered">
        <button
          id="noSwipeBtn"
          className="button is-danger"
          onClick={() => handleSwipe(thisUser, thatUser, "no")}
          disabled={loading}
        >
          NO
        </button>

        <button
          id="yesSwipeBtn"
          className="button is-success"
          onClick={() => {
            setPossibleMatchUser(null)
            handleSwipe(thisUser, thatUser, "yes")
          }}
          disabled={loading}
        >
          YES
        </button>
      </div>
    </div>
  )
}

export default SwipeButtons

SwipeButtons.propTypes = {
  thisUser: PropTypes.object.isRequired,
  thatUser: PropTypes.object.isRequired,
}

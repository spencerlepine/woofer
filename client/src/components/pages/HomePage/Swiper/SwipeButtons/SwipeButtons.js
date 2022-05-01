import React from "react"
import PropTypes from "prop-types"
import useSwiper, { SwiperProvider } from "context/SwiperContext/SwiperContext"
import { IoPaw as YesIcon } from "react-icons/io5"
import { TiCancel as NoIcon } from "react-icons/ti"

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
          className="button is-danger mx-3"
          onClick={() => handleSwipe(thisUser, thatUser, "no")}
          disabled={loading}
        >
          NO
          <NoIcon />
        </button>

        <button
          id="yesSwipeBtn"
          className="button is-success mx-3"
          onClick={() => {
            setPossibleMatchUser(null)
            handleSwipe(thisUser, thatUser, "yes")
          }}
          disabled={loading}
        >
          YES
          <YesIcon />
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

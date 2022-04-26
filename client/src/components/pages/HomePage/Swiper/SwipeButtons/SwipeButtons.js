import React from "react"
import PropTypes from "prop-types"
import useSwiper, { SwiperProvider } from "context/SwiperContext/SwiperContext"

const SwipeButtons = ({ thisUser, thatUser }) => {
  const { swipeButtonLoading: loading, handleSwipe } = useSwiper()

  return (
    <div className="swipeButtons">
      <div className="section p-3 has-text-centered">
        <button
          className="button is-danger"
          onClick={() => handleSwipe(thisUser, thatUser, "no")}
          disabled={loading}
        >
          NO
        </button>

        <button
          className="button is-success"
          onClick={() => handleSwipe(thisUser, thatUser, "yes")}
          disabled={loading}
        >
          YES
        </button>
      </div>
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

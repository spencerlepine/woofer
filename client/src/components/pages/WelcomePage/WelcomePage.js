import React from "react"
import { FaRegHandPeace as HelloIcon } from "react-icons/fa"
// MdWavingHand
import withAuthRedirect from "hooks/useAuthRedirect/useAuthRedirect"
import { Link } from "react-router-dom"
import * as ROUTES from "config/routeConstants"
import chatScreenshot from "assets/chatScreenshot.png"
import swipeScreenshot from "assets/swipeScreenshot.png"

const WelcomePage = () => (
  <div className="hero-body general-settings">
    <div className="container">
      <div className="WelcomePage section">
        <HelloIcon className="icon is-large is-danger" />
        <p className="title is-4">Welcome to Woofer!</p>

        <p className="subtitle has-text-info">Start matching today</p>

        <>
          <Link to={ROUTES.LOGIN} className="button is-link">
            SIGN IN
          </Link>
        </>
      </div>

      <div className="section">
        <div className="card">
          <p className="title is-4 has-text-info">Swipe Possible Matches</p>
          <figure className="image is-3by2 mx-auto">
            <img src={swipeScreenshot} alt="User Thumbnail" className="mx-auto" />
          </figure>
        </div>
      </div>

      <div className="section">
        <div className="card">
          <p className="title is-4 has-text-info">Chat with Matches</p>
          <figure className="image is-3by2 mx-auto">
            <img src={chatScreenshot} alt="User Thumbnail" className="mx-auto" />
          </figure>
        </div>
      </div>
    </div>
  </div>
)

const isAuthPage = true
export default withAuthRedirect(WelcomePage, isAuthPage)

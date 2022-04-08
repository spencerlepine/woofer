import React from "react"
import { Link } from "react-router-dom"
import { FaUserAlt as ProfileIcon } from "react-icons/fa"
import { IoMdSettings as SettingsIcon } from "react-icons/io"
import { BiMessageSquare as MessagesIcon } from "react-icons/bi"
import * as ROUTES from "config/routeConstants"
import useAuth from "context/AuthContext/AuthContext"

const Navbar = () => {
  const { logoutUser, currentUser } = useAuth()
  // TODO import woofer logo

  return (
    <nav className="navbar is-primary pr-3 pl-3" role="navigation">
      <div className="navbar-start">
        <Link to={ROUTES.HOME} className="navbar-item">
          Woofer
          {/* <img src={WooferLogo} alt='Woofer Logo' className={classes.logoLink}></img> */}
        </Link>
      </div>

      {currentUser ? (
        <div className="navbar-end">
          <div className="navbar-item">
            <button
              onClick={() => logoutUser()}
              className="button is-secondary has-text-centered is-2"
            >
              Log Out
            </button>
          </div>

          <Link to={ROUTES.CHATS} className="navbar-item">
            <MessagesIcon />
          </Link>

          <Link to={ROUTES.PROFILE} className="navbar-item">
            <ProfileIcon />
          </Link>

          <Link to={ROUTES.SETTINGS} className="navbar-item">
            <SettingsIcon />
          </Link>
        </div>
      ) : (
        <div className="navbar-end">
          <Link to={ROUTES.LOGIN} className="navbar-item">
            Login
          </Link>

          <Link to={ROUTES.SIGNUP} className="navbar-item">
            Signup
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar

import React from "react"
import { Link } from "react-router-dom"
import { FaUserAlt as ProfileIcon } from "react-icons/fa"
import { IoMdSettings as SettingsIcon } from "react-icons/io"
import { BiMessageSquare as MessagesIcon } from "react-icons/bi"
import * as ROUTES from "config/routeConstants"
import useAuth from "context/AuthContext/AuthContext"
import WooferIcon from "assets/WooferIcon.png"

const Navbar = () => {
  const { logoutUser, currentUser } = useAuth()

  return (
    <nav className="navbar is-primary pr-3 pl-3" role="navigation">
      <div className="navbar-start">
        <Link to={ROUTES.HOME} className="navbar-item">
          <img className="image is-36x36" src={WooferIcon} alt="Woofer Logo"></img>
          <p className="is-size-3">Woofer</p>
        </Link>
      </div>

      {currentUser ? (
        <div className="navbar-end">
          <div className="navbar-item">
            <button
              onClick={logoutUser}
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

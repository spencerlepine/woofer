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
    <nav className="navbar is-primary" role="navigation">
      <div className="navbar-start">
        <Link to={ROUTES.HOME} className="navbar-item">
          Woofer
          {/* <img src={WooferLogo} alt='Woofer Logo' className={classes.logoLink}></img> */}
        </Link>
      </div>

      {currentUser ? (
        <div className="navbar-end">
          <button onClick={() => logoutUser()}>Log Out</button>

          <Link to={ROUTES.CHATS}>
            <MessagesIcon />
          </Link>

          <Link to={ROUTES.PROFILE}>
            <ProfileIcon />
          </Link>

          <Link to={ROUTES.SETTINGS}>
            <SettingsIcon />
          </Link>
        </div>
      ) : (
        <div className="navbar-end">
          <Link to={ROUTES.LOGIN}>Login</Link>

          <Link to={ROUTES.SIGNUP}>Signup</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar

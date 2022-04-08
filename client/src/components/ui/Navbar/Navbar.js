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
    <nav>
      <Link to={ROUTES.HOME}>
        Woofer
        {/* <img src={WooferLogo} alt='Woofer Logo' className={classes.logoLink}></img> */}
      </Link>

      {currentUser ? (
        <>
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
        </>
      ) : (
        <>
          <Link to={ROUTES.LOGIN}>Login</Link>

          <Link to={ROUTES.SIGNUP}>Signup</Link>
        </>
      )}
    </nav>
  )
}

export default Navbar

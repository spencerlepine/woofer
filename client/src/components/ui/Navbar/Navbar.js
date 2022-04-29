import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { FaUserAlt as ProfileIcon } from "react-icons/fa"
import { IoMdSettings as SettingsIcon } from "react-icons/io"
import { BsFillChatSquareDotsFill as MessagesIcon } from "react-icons/bs"
import * as ROUTES from "config/routeConstants"
import useAuth from "context/AuthContext/AuthContext"
// import WooferIcon from "assets/WooferIcon.png"
import WooferLogo from "assets/WooferLogo.png"
import useOutsideClick from "hooks/useOutsideClick/useOutsideClick"

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000)
  const [showMobileNav, setShowMobileNav] = useState(false)
  const { logoutUser, currentUser } = useAuth()
  const popupRef = useRef(null)

  useOutsideClick(popupRef, () => setShowMobileNav(false))

  const handleResize = () => {
    if (window.innerWidth < 1000) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  const MenuPopup = () => (
    <>
      {isMobile && showMobileNav && (
        <div ref={popupRef} className="dropdown navbar-dropdown is-pulled-right">
          {currentUser ? <WhenLoggedIn /> : <PromptSignIn />}
        </div>
      )}
    </>
  )

  const WhenLoggedIn = () => (
    <div className="navbar-end">
      <div className="navbar-item">
        <button
          onClick={logoutUser}
          className="button is-link has-text-centered is-2"
        >
          Log Out
        </button>
      </div>

      <Link to={ROUTES.CHAT_LIST} className="navbar-item">
        <MessagesIcon className="icon is-medium" />
      </Link>

      <Link to={ROUTES.PROFILE} className="navbar-item">
        <ProfileIcon className="icon is-medium" />
      </Link>

      <Link to={ROUTES.SETTINGS} className="navbar-item">
        <SettingsIcon className="icon is-medium" />
      </Link>
    </div>
  )

  const PromptSignIn = () => (
    <div className="navbar-end">
      <div className="navbar-item">
        <Link
          to={ROUTES.LOGIN}
          className="navbar-item button is-link has-text-centered m-2"
        >
          <p>Login</p>
        </Link>

        <Link
          to={ROUTES.SIGNUP}
          className="navbar-item button is-link has-text-centered m-2"
        >
          <p>Signup</p>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      <nav className="navbar is-primary pr-3 pl-3" role="navigation">
        <div className="navbar-brand">
          <Link to={ROUTES.HOME} className="navbar-item">
            {/* <img className="image is-32x32" src={WooferIcon} alt="Woofer Logo"></img> */}
            <img className="image" src={WooferLogo} alt="Woofer Logo"></img>
            {/* <p className="title is-2">Woofer</p> */}
          </Link>

          <a
            role="button"
            className={`navbar-burger ${showMobileNav ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={() => setShowMobileNav(!showMobileNav)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className="navbar-menu">
          {currentUser ? <WhenLoggedIn /> : <PromptSignIn />}
        </div>
      </nav>
      <MenuPopup />
    </>
  )
}

export default Navbar

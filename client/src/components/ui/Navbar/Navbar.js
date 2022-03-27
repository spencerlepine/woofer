import React from "react"
import { Link } from "react-router-dom"
import * as ROUTES from "config/routeConstants"
import useAuth from "context/AuthContext/AuthContext"

const Navbar = () => {
  const { logoutUser, currentUser } = useAuth()

  return (
    <nav>
      <Link to={ROUTES.HOME}>
        Woofer
        {/* <img src={WooferLogo} alt='QuickCart Logo' className={classes.logoLink}></img> */}
      </Link>

      {currentUser ? (
        <button onClick={() => logoutUser()}>Log Out</button>
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

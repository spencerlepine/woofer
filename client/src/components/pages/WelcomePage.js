import React from "react"
import withAuthRedirect from "hooks/useAuthRedirect/useAuthRedirect"

const WelcomePage = () => (
  <div className="WelcomePage">Welcome! Log in please :D</div>
)

const isAuthPage = true
export default withAuthRedirect(WelcomePage, isAuthPage)

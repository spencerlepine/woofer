import React from "react"
import Profile from "./Profile/Profile"
import withAuthRedirect from "hooks/useAuthRedirect/useAuthRedirect"

const ProfilePage = () => (
  <div className="ProfilePage">
    <Profile />
  </div>
)

const isAuthPage = false
export default withAuthRedirect(ProfilePage, isAuthPage)

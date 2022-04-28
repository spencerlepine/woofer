import React from "react"
import withAuthRedirect from "hooks/useAuthRedirect/useAuthRedirect"
import SettingsForm from "./SettingsForm/SettingsForm"
import ProfilePictureField from "./SettingsForm/ProfilePictureField"
import EmailReset from "./SettingsForm/EmailReset"

const SettingsPage = () => {
  return (
    <div className="SettingsPage section">
      <EmailReset />

      {/* <ProfilePictureField /> */}

      <SettingsForm />
    </div>
  )
}

const isAuthPage = false
export default withAuthRedirect(SettingsPage, isAuthPage)

import React from "react"
import withAuthRedirect from "hooks/useAuthRedirect/useAuthRedirect"
import SettingsForm from "./SettingsForm/SettingsForm"
import ProfilePictureField from "./SettingsForm/ProfilePictureField"
import EmailReset from "./SettingsForm/EmailReset"
import DeleteAccBtn from "./SettingsForm/DeleteAccBtn"

const SettingsPage = () => {
  return (
    <div className="SettingsPage section">
      <h2 className="title is-2">Settings</h2>

      <ProfilePictureField />

      <br />

      <SettingsForm />

      <EmailReset />
      <DeleteAccBtn />
    </div>
  )
}

const isAuthPage = false
export default withAuthRedirect(SettingsPage, isAuthPage)

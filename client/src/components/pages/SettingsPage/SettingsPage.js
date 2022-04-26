import React from "react"
import { sendPasswordResetEmail } from "api/account"
import withAuthRedirect from "hooks/useAuthRedirect/useAuthRedirect"
import useAuth, { AuthProvider } from "context/AuthContext/AuthContext"
import SettingsForm from "./SettingsForm/SettingsForm"

const SettingsPage = () => {
  const { currentUser } = useAuth()

  const handleReset = () => {
    if (currentUser && currentUser["email"]) {
      const { email } = currentUser
      sendPasswordResetEmail(email)
    }
  }

  return (
    <div className="SettingsPage section">
      <h2 className="title is-2">Settings</h2>
      <button className="button is-danger" onClick={handleReset}>
        Send Password Reset Email
      </button>

      <SettingsForm />
    </div>
  )
}

const WrappedSettings = (props) => (
  <AuthProvider>
    <SettingsPage {...props} />
  </AuthProvider>
)

const isAuthPage = false
export default withAuthRedirect(WrappedSettings, isAuthPage)

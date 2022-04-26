import React from "react"
import { sendPasswordResetEmail } from "api/account"
import withAuthRedirect from "hooks/useAuthRedirect/useAuthRedirect"
import useAuth, { AuthProvider } from "context/AuthContext/AuthContext"

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
      <p>Settings</p>
      <button className="button is-danger" onClick={handleReset}>
        Send Password Reset Email
      </button>
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

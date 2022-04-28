import React from "react"
import { sendPasswordResetEmail } from "api/account"
import useAuth, { AuthProvider } from "context/AuthContext/AuthContext"

const EmailReset = () => {
  const { currentUser } = useAuth()

  const handleReset = () => {
    if (currentUser && currentUser["email"]) {
      const { email } = currentUser
      sendPasswordResetEmail(email)
    }
  }

  return (
    <div className="EmailReset section">
      <h2 className="title is-2">Settings</h2>
      <button className="button is-danger" onClick={handleReset}>
        Send Password Reset Email
      </button>
    </div>
  )
}

const WrappedSettings = (props) => (
  <AuthProvider>
    <EmailReset {...props} />
  </AuthProvider>
)

export default WrappedSettings

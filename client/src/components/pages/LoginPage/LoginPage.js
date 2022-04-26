import React from "react"
import withAuthRedirect from "hooks/useAuthRedirect/useAuthRedirect"
import AccountForm from "components/ui/AccountForm/AccountForm"
import * as ROUTES from "config/routeConstants"
import useAuth, { AuthProvider } from "context/AuthContext/AuthContext"

const LoginPage = () => {
  const { loginUser } = useAuth()

  const handleLogin = (formEntries) => {
    loginUser(formEntries["email"], formEntries["password"])
  }

  const loginFields = [
    {
      name: "email",
      placeholder: "Email",
    },
    {
      name: "password",
      placeholder: "Password",
    },
  ]

  return (
    <div>
      <AccountForm
        SubmitLabel="Log in"
        FormTitle="Log In"
        FormFields={loginFields}
        WrongFormLabel={"Don't have an account?"}
        CorrectionFormName={"Sign Up"}
        CorrectionFormLink={ROUTES.SIGNUP}
        handleSubmit={handleLogin}
      />
    </div>
  )
}

const WrappedPage = (props) => (
  <AuthProvider>
    <LoginPage {...props} />
  </AuthProvider>
)

const isAuthPage = true
export default withAuthRedirect(WrappedPage, isAuthPage)

import React from "react"
import withAuthRedirect from "hooks/useAuthRedirect/useAuthRedirect"
import AccountForm from "components/AccountForm/AccountForm"
import * as ROUTES from "config/routeConstants"
import useAuth from "context/AuthContext/AuthContext"

const SignupPage = () => {
  const { signupUser } = useAuth()

  const handleSignup = (formEntries) => {
    signupUser(formEntries["name"], formEntries["email"], formEntries["password"])
  }

  const signupFields = [
    {
      name: "name",
      placeholder: "Name",
    },
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
        SubmitLabel="Sign Up"
        FormTitle="Sign Up"
        FormFields={signupFields}
        WrongFormLabel={"Already have an account?"}
        CorrectionFormName={"Log In"}
        CorrectionFormLink={ROUTES.LOGIN}
        handleSubmit={handleSignup}
      />
    </div>
  )
}

const isAuthPage = true
export default withAuthRedirect(SignupPage, isAuthPage)

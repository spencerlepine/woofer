import React from "react"
import withAuthRedirect from "hooks/useAuthRedirect/useAuthRedirect"
import AccountForm from "components/ui/AccountForm/AccountForm"
import * as ROUTES from "config/routeConstants"
import useAuth, { AuthProvider } from "context/AuthContext/AuthContext"

const signupFields = [
  {
    name: "firstName",
    placeholder: "First Name",
  },
  {
    name: "lastName",
    placeholder: "Last Name",
  },
  {
    name: "username",
    placeholder: "Username",
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

const SignupPage = () => {
  const { signupUser } = useAuth()

  const handleSignup = (formEntries) => {
    const formCompleted = signupFields.every(({ name: expectedKey }) => {
      return formEntries[expectedKey]
    })

    const nameValid = formEntries["firstName"].length <= 15
    const usernameValid = formEntries["lastName"].length <= 15

    if (formCompleted) {
      signupUser(
        formEntries["firstName"],
        formEntries["lastName"],
        formEntries["username"],
        formEntries["email"],
        formEntries["password"]
      )
    }
  }

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

const WrappedPage = (props) => (
  <AuthProvider>
    <SignupPage {...props} />
  </AuthProvider>
)

const isAuthPage = true
export default withAuthRedirect(WrappedPage, isAuthPage)

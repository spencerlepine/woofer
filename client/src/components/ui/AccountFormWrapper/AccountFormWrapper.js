import React, { useState, useEffect } from "react"
import useAuth, { AuthProvider } from "context/AuthContext/AuthContext"
import constants from "config/constants"
const { DATA_KEYS } = constants

import { Link } from "react-router-dom"
import * as ROUTES from "config/routeConstants"

const FormWrapper = ({ FieldsComponent, LargeWidth }) => {
  const { currentUser, accountDetails, updateAccountDetails } = useAuth()
  const [formEntries, setFormEntries] = useState({})
  // const [loading, setLoading] = useState(false)
  const [madeChange, setMadeChange] = useState(false)

  useEffect(() => {
    setFormEntries((prevEntries) => ({
      ...prevEntries,
      ...accountDetails,
    }))
  }, [accountDetails])

  const handleChange = (event) => {
    const { name, value } = event.target

    setMadeChange(true)
    setFormEntries((prevEntries) => ({
      ...prevEntries,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault()
    }

    if (madeChange) {
      const newDetails = {
        ...accountDetails,
        ...formEntries,
        [DATA_KEYS["USER_ID"]]: currentUser.uid,
      }

      updateAccountDetails(newDetails, (updatedDetails) => {
        setFormEntries(updatedDetails)
      })
    }
    setMadeChange(false)
  }

  const manualSubmit = (newDetails) => {
    setMadeChange(false)
    // setLoading(true)

    const finalDetails = {
      ...accountDetails,
      ...newDetails,
      [DATA_KEYS["USER_ID"]]: currentUser.uid,
    }

    updateAccountDetails(finalDetails, (updatedDetails) => {
      setFormEntries(updatedDetails)
      // setLoading(false)
    })
  }

  // const LoadingSpinner = (props) => (
  //   <>{loading ? <p>Updating...</p> : <>{props.children}</>}</>
  // )

  const FieldProps = {
    updateAccountDetails,
    accountDetails,
    currentUser,
    formEntries,
    setFormEntries,
    handleSubmit,
    handleChange,
    madeChange,
    setMadeChange,
    manualSubmit,
  }

  return (
    <section className="hero is-medium">
      <div className="columns is-centered">
        <div className={`column is-fluid ${LargeWidth ? "" : "is-half"}`}>
          {/* <LoadingSpinner> */}
          {currentUser ? (
            <form className="box has-text-centered">
              <button
                disabled={!madeChange}
                onClick={handleSubmit}
                className="button is-primary p-2 is-pulled-right"
              >
                Update
              </button>
              <br></br>
              <hr></hr>

              <FieldsComponent {...FieldProps} />
            </form>
          ) : (
            <>
              <h4>Sign in to continue</h4>
              <Link to={ROUTES.LOGIN}>LOG IN</Link>
            </>
          )}
          {/* </LoadingSpinner> */}
        </div>
      </div>
    </section>
  )
}

const WrappedForm = (props) => (
  <AuthProvider>
    <FormWrapper {...props} />
  </AuthProvider>
)

export default WrappedForm

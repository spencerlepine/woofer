import React, { useState, useEffect } from "react"
import useAuth, { AuthProvider } from "context/AuthContext/AuthContext"
import constants from "config/constants"
const { DATA_KEYS } = constants

const FormWrapper = ({ FieldsComponent }) => {
  const { currentUser, accountDetails, updateAccountDetails } = useAuth()
  const [formEntries, setFormEntries] = useState({})
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
    e.preventDefault()
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
  }

  return (
    <div className="columns is-centered is-5-tablet is-4-desktop is-3-widescreen">
      <div className="column is-5-tablet is-4-desktop is-3-widescreen">
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

          <FieldsComponent
            updateAccountDetails={updateAccountDetails}
            accountDetails={accountDetails}
            currentUser={currentUser}
            formEntries={formEntries}
            setFormEntries={setFormEntries}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            madeChange={madeChange}
            setMadeChange={setMadeChange}
          />
        </form>
      </div>
    </div>
  )
}

const WrappedForm = (props) => (
  <AuthProvider>
    <FormWrapper {...props} />
  </AuthProvider>
)

export default WrappedForm

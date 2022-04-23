import React, { useState } from "react"
import * as Feilds from "./Fields"
import constants from "config/constants"
const { DATA_KEYS } = constants

const GeneralTab = ({
  updateAccountDetails,
  accountDetails,
  currentUser,
  formEntries,
  setFormEntries,
}) => {
  const [madeChange, setMadeChange] = useState(false)

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
            className="button is-primary p-2"
          >
            Update
          </button>

          <Feilds.MainFields handleChange={handleChange} formEntries={formEntries} />

          <Feilds.BioField handleChange={handleChange} formEntries={formEntries} />

          <Feilds.GenderButton
            madeAChange={() => setMadeChange(true)}
            formEntries={formEntries}
            setFormEntries={setFormEntries}
          />

          <Feilds.BreedField handleChange={handleChange} formEntries={formEntries} />

          <Feilds.ZodiacDropDown
            setMadeChange={setMadeChange}
            formEntries={formEntries}
            setFormEntries={setFormEntries}
          />

          <Feilds.GroupDropDown
            setMadeChange={setMadeChange}
            formEntries={formEntries}
            setFormEntries={setFormEntries}
          />
        </form>
      </div>
    </div>
  )
}

export default GeneralTab

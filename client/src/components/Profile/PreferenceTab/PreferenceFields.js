import React, { useState } from "react"
import constants from "config/constants"
const { DATA_KEYS } = constants

export const GenderButton = ({ formEntries, setFormEntries, madeAChange }) => {
  const isMale = formEntries[DATA_KEYS["USER_PREFERENCE"]] === "Male"
  const isFemale = formEntries[DATA_KEYS["USER_PREFERENCE"]] === "Female"

  return (
    <div className="control">
      <h3 className="label level-center">Gender Preference</h3>
      <button
        onClick={() => {
          setFormEntries((prevEntries) => ({
            ...prevEntries,
            [DATA_KEYS["USER_PREFERENCE"]]: "Male",
          }))
          madeAChange()
        }}
        disabled={isMale}
        className={`button ${
          isFemale ? "is-secondary" : "is-primary"
        } has-text-centered is-2`}
      >
        Male
      </button>
      <button
        onClick={() => {
          setFormEntries((prevEntries) => ({
            ...prevEntries,
            [DATA_KEYS["USER_PREFERENCE"]]: "Female",
          }))
          madeAChange()
        }}
        disabled={isFemale}
        className={`button ${
          isMale ? "is-secondary" : "is-primary"
        } has-text-centered is-2`}
      >
        Female
      </button>
    </div>
  )
}

export const ZipCodeList = ({ formEntries, setFormEntries, madeAChange }) => {
  const allUserZipCodes = formEntries[DATA_KEYS["USER_ZIPCODES"]] || []
  const [zipcodeInput, setZipcodeInput] = useState("")

  const handleChange = (e) => {
    setZipcodeInput(e.target.value)
  }

  const handleAddZipCode = (e) => {
    e.preventDefault()
    const newZipCode = zipcodeInput

    if (newZipCode) {
      let updatedZips = new Set(allUserZipCodes)
      updatedZips.add(newZipCode)
      const filteredZips = Array.from(updatedZips)

      madeAChange()
      setFormEntries((prevEntries) => ({
        ...prevEntries,
        [DATA_KEYS["USER_ZIPCODES"]]: filteredZips,
      }))
      setZipcodeInput("")
    }
  }

  const handleDeleteZipCode = (e, oldZipCode) => {
    e.preventDefault()

    let updatedZips = new Set(allUserZipCodes)
    updatedZips.delete(oldZipCode)
    const filteredZips = Array.from(updatedZips)

    madeAChange()
    setFormEntries((prevEntries) => ({
      ...prevEntries,
      [DATA_KEYS["USER_ZIPCODES"]]: filteredZips,
    }))
    setZipcodeInput("")
  }

  return (
    <div className="control">
      <h3 className="label level-left">Zipcodes</h3>

      <div className="list">
        <ul>
          {allUserZipCodes.map((zipcodeStr) => (
            <div className="list-item">
              <li className="is-left is-inline">{zipcodeStr}</li>
              <button
                className="delete is-medium is-right"
                onClick={(e) => handleDeleteZipCode(e, zipcodeStr)}
              ></button>
            </div>
          ))}
        </ul>
      </div>

      <form>
        <div className="field">
          <input
            onChange={handleChange}
            type="name"
            name="zipcode"
            className={"input"}
            value={zipcodeInput}
            placeholder="Type ZipCode"
          ></input>
        </div>
        <button onClick={handleAddZipCode} className="button is-primary p-2">
          ADD
        </button>
      </form>
    </div>
  )
}

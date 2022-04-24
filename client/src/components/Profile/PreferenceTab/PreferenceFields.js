import React, { useState } from "react"
import constants from "config/constants"
import useAuth, { AuthProvider } from "context/AuthContext/AuthContext"
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

export const ZipCodeList = ({ formEntries, setFormEntries, handleSubmit }) => {
  const allUserZipCodes = formEntries[DATA_KEYS["USER_ZIPCODES"]] || []
  const [zipcodeInput, setZipcodeInput] = useState("")

  const { addUserToZipPool, removeUserFromZipPool } = useAuth()

  const handleChange = (e) => {
    e.preventDefault()
    setZipcodeInput(e.target.value)
  }

  const handleAddZipCode = (e) => {
    e.preventDefault()
    const newZipCode = zipcodeInput
    const zipRegex = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/)

    if (newZipCode && zipRegex.test(newZipCode)) {
      setZipcodeInput("")

      addUserToZipPool(newZipCode, () => {
        let updatedZips = new Set(allUserZipCodes)
        updatedZips.add(newZipCode)
        const filteredZips = Array.from(updatedZips)

        setFormEntries((prevEntries) => ({
          ...prevEntries,
          [DATA_KEYS["USER_ZIPCODES"]]: filteredZips,
        }))
        handleSubmit()
      })
    }
  }

  const handleDeleteZipCode = (e, oldZipCode) => {
    e.preventDefault()

    removeUserFromZipPool(oldZipCode, () => {
      setZipcodeInput("")

      let updatedZips = new Set(allUserZipCodes)
      updatedZips.delete(oldZipCode)
      const filteredZips = Array.from(updatedZips)

      setFormEntries((prevEntries) => ({
        ...prevEntries,
        [DATA_KEYS["USER_ZIPCODES"]]: filteredZips,
      }))
      handleSubmit()
    })
  }

  return (
    <div className="control">
      <h3 className="label level-left">Zipcodes</h3>

      <div className="list">
        <ul>
          {allUserZipCodes.map((zipcodeStr, i) => (
            <div className="list-item" key={i}>
              <li className="is-left is-inline">{zipcodeStr}</li>
              <button
                className="delete is-medium is-right"
                onClick={(e) => handleDeleteZipCode(e, zipcodeStr)}
              ></button>
            </div>
          ))}
        </ul>
      </div>

      <div>
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
      </div>
    </div>
  )
}

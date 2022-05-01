import React, { useState } from "react"
import constants from "config/constants"
import useAuth, { AuthProvider } from "context/AuthContext/AuthContext"
const { DATA_KEYS } = constants

import { MdOutlineRemoveCircleOutline as DeleteIcon } from "react-icons/md"

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
      <h3 className="title is-4">Zipcodes</h3>

      <table className="table mx-auto">
        <tbody>
          {allUserZipCodes.map((zipcodeStr, i) => (
            <tr className="list-item" key={i}>
              <td>
                <p className="title is-inline px-5 has-text-info">{zipcodeStr}</p>
              </td>
              <td>
                <button
                  className="button is-danger is-medium is-right"
                  onClick={(e) => handleDeleteZipCode(e, zipcodeStr)}
                >
                  <DeleteIcon className="icon is-medium" />
                </button>
              </td>
            </tr>
          ))}

          <tr className="">
            <td>
              <input
                onChange={handleChange}
                type="name"
                name="zipcode"
                className={"input"}
                value={zipcodeInput}
                placeholder="Type ZipCode"
              ></input>
            </td>
            <td>
              <button onClick={handleAddZipCode} className="button is-success p-2">
                ADD
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

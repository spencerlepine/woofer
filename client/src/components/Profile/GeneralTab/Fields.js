import React, { useState } from "react"
import constants from "config/constants"
const { DATA_KEYS } = constants

const formFields = [
  {
    name: DATA_KEYS["USER_FIRST_NAME"],
    placeholder: "First Name",
    type: "name",
  },
  {
    name: DATA_KEYS["USER_LAST_NAME"],
    placeholder: "Last Name",
    type: "name",
  },
]

export const MainFields = ({ handleChange, formEntries }) => {
  console.log("Main Details:", formEntries)

  return formFields.map(({ name, type, placeholder }, i) => (
    <div className="field" key={i}>
      <label htmlFor="" className="label level-left">
        {placeholder}
      </label>
      <input
        onChange={handleChange}
        type={type}
        name={name}
        className={"input"}
        value={formEntries[name] || ""}
        placeholder={placeholder}
      ></input>
    </div>
  ))
}

export const BioField = ({ handleChange, formEntries }) => (
  <div className="field">
    <label htmlFor="" className="label level-left">
      {"Bio"}
    </label>
    <textarea
      onChange={handleChange}
      type={"textarea"}
      row={10}
      name={DATA_KEYS["USER_BIO"]}
      className={"textarea"}
      value={formEntries[DATA_KEYS["USER_BIO"]] || ""}
      placeholder={"Bio"}
    ></textarea>
  </div>
)

export const GenderButton = ({ formEntries, setFormEntries, madeAChange }) => {
  const isMale = formEntries[DATA_KEYS["USER_PREFERENCE"]] === "Male"
  const isFemale = formEntries[DATA_KEYS["USER_PREFERENCE"]] === "Female"

  return (
    <div className="control">
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

export const BreedField = ({ handleChange, formEntries }) => (
  <div className="field">
    <label htmlFor="" className="label level-left">
      Breed
    </label>
    <input
      onChange={handleChange}
      type={"input"}
      name={DATA_KEYS["USER_BREED"]}
      className={"input"}
      value={formEntries[DATA_KEYS["USER_BREED"]] || ""}
      placeholder={"Breed"}
    ></input>
  </div>
)

const options = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
]
export const ZodiacDropDown = ({ formEntries, setFormEntries, setMadeChange }) => {
  const [selectedVal, setSelectedVal] = useState(
    formEntries[DATA_KEYS["USER_ZODIAC"]] || "Choose One"
  )

  return (
    <div className="field">
      <label className="label">Zodiac</label>
      <div className="control">
        <div className="select">
          <select
            value={selectedVal}
            onChange={(e) => {
              setMadeChange(true)
              setFormEntries((prevEntries) => ({
                ...prevEntries,
                [DATA_KEYS["USER_ZODIAC"]]: e.target.value,
              }))
            }}
          >
            {options.map((optionName, i) => (
              <option key={i} value={optionName}>
                {optionName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

const groupOptions = [
  "Herding",
  "Working",
  "Sporting",
  "Non-Sporting",
  "Toy",
  "Terrier",
  "Hound",
]

export const GroupDropDown = ({ formEntries, setFormEntries, setMadeChange }) => {
  const [selectedVal, setSelectedVal] = useState(
    formEntries[DATA_KEYS["USER_GROUP"]] || "Choose One"
  )

  return (
    <div className="field">
      <label className="label">Group</label>
      <div className="control">
        <div className="select">
          <select
            value={selectedVal}
            onChange={(e) => {
              setMadeChange(true)
              setFormEntries((prevEntries) => ({
                ...prevEntries,
                [DATA_KEYS["USER_GROUP"]]: e.target.value,
              }))
            }}
          >
            {groupOptions.map((optionName, i) => (
              <option key={i} value={optionName}>
                {optionName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

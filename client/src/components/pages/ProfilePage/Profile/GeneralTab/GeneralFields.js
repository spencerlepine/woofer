import React, { useState, useEffect } from "react"

const formFields = [
  {
    name: "firstName",
    placeholder: "First Name",
    type: "name",
  },
  {
    name: "lastName",
    placeholder: "Last Name",
    type: "name",
  },
]

export const MainFields = ({ handleChange, formEntries }) => {
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
      name={"bio"}
      className={"textarea"}
      value={formEntries["bio"] || ""}
      placeholder={"Bio"}
    ></textarea>
  </div>
)

export const GenderButton = ({ formEntries, setFormEntries, madeAChange }) => {
  const isMale = formEntries["gender"] === "Male"
  const isFemale = formEntries["gender"] === "Female"

  return (
    <div className="control">
      <h3 className="label level-center">Gender</h3>
      <button
        onClick={() => {
          setFormEntries((prevEntries) => ({
            ...prevEntries,
            ["gender"]: "Male",
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
            ["gender"]: "Female",
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
      name={"breed"}
      className={"input"}
      value={formEntries["breed"] || ""}
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
  const [selectedVal, setSelectedVal] = useState()

  useEffect(() => {
    setSelectedVal(formEntries["zodiac"] || "Choose One")
  }, [formEntries])

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
                ["zodiac"]: e.target.value,
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
    formEntries["group"] || "Choose One"
  )

  useEffect(() => {
    setSelectedVal(formEntries["group"] || "Choose One")
  }, [formEntries])

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
                ["group"]: e.target.value,
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

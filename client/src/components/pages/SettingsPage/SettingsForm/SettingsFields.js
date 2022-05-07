import React, { useState } from "react"
import useAuth, { AuthProvider } from "context/AuthContext/AuthContext"

export const Birthday = ({ setFormEntries, formEntries, madeAChange }) => {
  const name = "birthday"
  const placeholder = "Birthday"
  const type = "date"

  const handleChange = (e) => {
    const dateVal = e.target.value
    const [year, month, day] = dateVal.split(/-/)
    const formattedDate = [day, month, year].join("/")
    madeAChange()

    setFormEntries((prevEntries) => ({
      ...prevEntries,
      birthday: formattedDate,
    }))
  }
  const dateToCalender = (databaseDate) => {
    const [day, month, year] = databaseDate.split(/\//gi)
    return [year, month, day].join("-")
  }

  return (
    <div className="field">
      <label htmlFor="" className="label level-left">
        {placeholder}
      </label>
      <input
        onChange={handleChange}
        type={type}
        name={name}
        className={"input"}
        value={dateToCalender(formEntries[name] || "")}
      ></input>
    </div>
  )
}

export const Username = ({ handleChange, formEntries }) => {
  const name = "username"
  const placeholder = "Username"
  const type = "name"

  return (
    <div className="field">
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
  )
}

export const ProfilePic = ({ handleChange, formEntries }) => {
  const name = "profilePicture"
  const placeholder = "Profile Picture URL"
  const type = "url"

  return (
    <div className="field">
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
  )
}

export const Email = ({ handleChange, formEntries }) => {
  const name = "email"
  const placeholder = "Email"
  const type = "email"

  return (
    <div className="field">
      <label htmlFor="" className="label level-left">
        {placeholder}
      </label>
      <input
        disabled
        onChange={handleChange}
        type={type}
        name={name}
        className={"input"}
        value={formEntries[name] || ""}
        placeholder={placeholder}
      ></input>
    </div>
  )
}

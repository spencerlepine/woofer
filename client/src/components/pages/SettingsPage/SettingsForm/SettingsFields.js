import React, { useState } from "react"
import constants from "config/constants"
import useAuth, { AuthProvider } from "context/AuthContext/AuthContext"
const { DATA_KEYS } = constants

export const Birthday = ({ setFormEntries, formEntries }) => {
  const name = DATA_KEYS["USER_BIRTHDAY"]
  const placeholder = "Birthday"
  const type = "date"

  const handleChange = (e) => {
    const dateVal = e.target.value
    const [year, month, day] = dateVal.split(/-/)
    const formattedDate = [day, month, year].join("/")

    setFormEntries((prevEntries) => ({
      ...prevEntries,
      [DATA_KEYS["USER_BIRTHDAY"]]: formattedDate,
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
  const name = DATA_KEYS["USER_NAME"]
  console.log(formEntries[name])
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
  const name = DATA_KEYS["USER_PROFILE_PIC"]
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
  const name = DATA_KEYS["USER_EMAIL"]
  const placeholder = "Email"
  const type = "email"

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

export const DeleteAccount = () => {
  const handleDelete = () => {
    console.log("TODO")
  }

  return (
    <button className="button is-danger" onClick={handleDelete}>
      DELETE ACCOUNT
    </button>
  )
}

import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
// import WooferLogo from "assets/images/Woofer-Logo.png";

const AccountForm = (props) => {
  const {
    CorrectionFormLink,
    FormFields,
    WrongFormLabel,
    CorrectionFormName,
    SubmitLabel,
    FormTitle,
    handleSubmit,
  } = props

  const [formEntries, setFormEntries] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormEntries((prevEntries) => ({
      ...prevEntries,
      [name]: value,
    }))
  }

  return (
    <form>
      {/* <img
        src={WooferLogo}
        alt="Woofer Logo"
      ></img> */}

      <h2>{FormTitle}</h2>

      {FormFields.map(({ name, placeholder }, i) => (
        <input
          key={i}
          onChange={handleChange}
          type={name}
          name={name}
          value={formEntries[name] || ""}
          placeholder={placeholder}
        ></input>
      ))}

      <button
        onClick={(e) => {
          e.preventDefault()
          handleSubmit(formEntries)
        }}
      >
        {SubmitLabel}
      </button>
      <hr />
      <p>{WrongFormLabel}</p>

      <div>
        <Link to={CorrectionFormLink}>{CorrectionFormName}</Link>
      </div>
    </form>
  )
}

export default AccountForm

AccountForm.propTypes = {
  CorrectionFormLink: PropTypes.string.isRequired,
  FormFields: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  WrongFormLabel: PropTypes.string.isRequired,
  CorrectionFormName: PropTypes.string.isRequired,
  SubmitLabel: PropTypes.string.isRequired,
  FormTitle: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

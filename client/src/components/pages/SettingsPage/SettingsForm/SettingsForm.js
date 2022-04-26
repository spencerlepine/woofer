import React, { useState } from "react"
import * as Fields from "./SettingsFields"
import FormWrapper from "components/ui/AccountFormWrapper/AccountFormWrapper"

const SettingsForm = ({
  updateAccountDetails,
  accountDetails,
  currentUser,
  formEntries,
  setFormEntries,
  handleSubmit,
  manualSubmit,
  handleChange,
  madeChange,
  setMadeChange,
}) => {
  return (
    <>
      <Fields.ProfilePic
        madeAChange={() => setMadeChange(true)}
        formEntries={formEntries}
        handleChange={handleChange}
        setFormEntries={setFormEntries}
      />

      <Fields.Username
        madeAChange={() => setMadeChange(true)}
        formEntries={formEntries}
        handleChange={handleChange}
        setFormEntries={setFormEntries}
      />

      <Fields.Email
        madeAChange={() => setMadeChange(true)}
        formEntries={formEntries}
        handleChange={handleChange}
        setFormEntries={setFormEntries}
      />

      <Fields.Birthday
        madeAChange={() => setMadeChange(true)}
        formEntries={formEntries}
        handleChange={handleChange}
        setFormEntries={setFormEntries}
      />

      <Fields.DeleteAccount />
    </>
  )
}

const WrappedTab = (props) => (
  <FormWrapper FieldsComponent={SettingsForm} {...props} />
)

export default WrappedTab

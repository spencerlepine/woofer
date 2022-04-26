import React, { useState } from "react"
import * as Fields from "./SettingsFields"
import FormWrapper from "components/ui/AccountFormWrapper/AccountFormWrapper"

const PreferenceTab = ({
  updateAccountDetails,
  accountDetails,
  currentUser,
  formEntries,
  setFormEntries,
  handleSubmit,
  handleChange,
  madeChange,
  setMadeChange,
}) => {
  return (
    <>
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
  <FormWrapper FieldsComponent={PreferenceTab} {...props} />
)

export default WrappedTab

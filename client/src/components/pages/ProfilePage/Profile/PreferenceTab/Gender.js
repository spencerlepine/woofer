import React, { useState } from "react"
import * as Fields from "./PreferenceFields"
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
      <Fields.GenderButton
        madeAChange={() => setMadeChange(true)}
        formEntries={formEntries}
        setFormEntries={setFormEntries}
      />
    </>
  )
}

const WrappedTab = (props) => (
  <FormWrapper FieldsComponent={PreferenceTab} {...props} />
)

export default WrappedTab

import React, { useState } from "react"
import * as Fields from "./GeneralFields"
import FormWrapper from "components/ui/AccountFormWrapper"

const GeneralTab = ({
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

      <Fields.MainFields handleChange={handleChange} formEntries={formEntries} />

      <Fields.BioField handleChange={handleChange} formEntries={formEntries} />

      <Fields.BreedField handleChange={handleChange} formEntries={formEntries} />

      <Fields.ZodiacDropDown
        setMadeChange={setMadeChange}
        formEntries={formEntries}
        setFormEntries={setFormEntries}
      />

      <Fields.GroupDropDown
        setMadeChange={setMadeChange}
        formEntries={formEntries}
        setFormEntries={setFormEntries}
      />
    </>
  )
}

const WrappedTab = (props) => <FormWrapper FieldsComponent={GeneralTab} {...props} />

export default WrappedTab

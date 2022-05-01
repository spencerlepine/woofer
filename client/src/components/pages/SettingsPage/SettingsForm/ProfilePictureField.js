import React, { useState } from "react"
import { uploadImageToFirebase, deleteImageFromFirebase } from "api/firebase"
import FormWrapper from "components/ui/AccountFormWrapper/AccountFormWrapper"

import { BiImageAdd } from "react-icons/bi"

import constants from "config/constants"
const { DATA_KEYS } = constants
const idKey = DATA_KEYS["USER_ID"]

const ImagesTab = ({
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
  const userId = currentUser[["userId"]]
  const profileKey = DATA_KEYS["USER_PROFILE_PIC"]
  const profilePic = accountDetails[profileKey]

  const currentProfilePic = profilePic

  const updateImage = (newImage) => {
    setMadeChange(true)
    const newEntries = {
      ...formEntries,
      profileKey: newImage,
    }
    manualSubmit(newEntries)
    // setFormEntries((prevEntries) => {
    //   const newEntries = {
    //     ...prevEntries,
    //     profileKey: newImage,
    //   }
    //   manualSubmit(newEntries)

    //   return newEntries
    // })
  }

  const handleDelete = (e, imageSrc) => {
    e.preventDefault()
    const missing = ""
    const fireRe = new RegExp(/firebase/i)
    console.log(fireRe.test(imageSrc))

    if (fireRe.test(imageSrc)) {
      deleteImageFromFirebase(imageSrc, userId, () => {
        updateImage(missing)
      })
    } else {
      updateImage(missing)
    }
  }

  return (
    <>
      <div className="tile is-ancestor">
        <div className="tile">
          <div className="card">
            <div className="card-image">
              <figure className="image is-128x128">
                <img src={currentProfilePic} alt="User Thumbnail" />
              </figure>
            </div>

            {currentProfilePic && (
              <button
                className="delete is-medium p-2"
                onClick={(e) => handleDelete(e, currentProfilePic)}
              ></button>
            )}
          </div>
        </div>
      </div>

      {currentProfilePic && (
        <div className="tile">
          <div className="file is-boxed">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                accept="image/*"
                name="picture"
                onChange={(event) => {
                  const imageFile = event.target.files[0]
                  if (imageFile.size < 2097152) {
                    setMadeChange(true)
                    uploadImageToFirebase(imageFile, userId, handleImageAdd)
                  }
                }}
                onClick={(event) => {
                  event.target.value = null
                }}
              />
              <span className="button file-cta is-primary">
                <span className="file-icon">
                  <BiImageAdd className="icon is-large" />
                </span>
                <span className="file-label">Upload Picture…</span>
              </span>
            </label>
          </div>
        </div>
      )}
    </>
  )
}

const WrappedTab = (props) => (
  <FormWrapper FieldsComponent={ImagesTab} LargeWidth={true} {...props} />
)

export default WrappedTab

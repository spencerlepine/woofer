import React, { useState } from "react"
import { uploadImageToFirebase, deleteImageFromFirebase } from "api/firebase"
import FormWrapper from "components/ui/AccountFormWrapper/AccountFormWrapper"

import { BiImageAdd } from "react-icons/bi"
import { MdOutlineRemoveCircleOutline as DeleteIcon } from "react-icons/md"

const missingImage =
  "https://www.britax-roemer.com/on/demandware.static/Sites-Britax-EU-Site/-/default/dw1be0148e/images/britax/PlaceholderProductImage.jpg"

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
  const profileKey = "profilePicture"
  const profilePic = accountDetails[profileKey]

  const currentProfilePic = profilePic
  const placeholderProfilePic = currentProfilePic || missingImage

  const updateImage = (newImage) => {
    setMadeChange(true)
    const newEntries = {
      ...formEntries,
      profilePicture: newImage,
    }
    manualSubmit(newEntries)
    // setFormEntries((prevEntries) => {
    //   const newEntries = {
    //     ...prevEntries,
    //     profilePicture: newImage,
    //   }
    //   manualSubmit(newEntries)

    //   return newEntries
    // })
  }

  const handleDelete = (e, imageSrc) => {
    e.preventDefault()
    const missing = ""
    const fireRe = new RegExp(/firebase/i)

    // If it is from firebase, try to delete it
    if (imageSrc && fireRe.test(imageSrc)) {
      deleteImageFromFirebase(imageSrc, userId, () => {
        updateImage(missing)
      })
    } else {
      updateImage(missing)
    }
  }

  const RemoveBtn = () => (
    <>
      {currentProfilePic && (
        <button
          className="button is-danger is-medium p-2"
          onClick={(e) => handleDelete(e, currentProfilePic)}
        >
          Remove <DeleteIcon />
        </button>
      )}
    </>
  )

  const UploadImageBtn = () => (
    <div className="file is-boxed is-centered">
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
              uploadImageToFirebase(imageFile, userId, updateImage)
            }
          }}
          onClick={(event) => {
            event.target.value = null
          }}
        />
        <span className="button file-cta is-primary">
          <span className="file-icon is-inline">
            <BiImageAdd className="icon is-large" />
          </span>
          <span className="file-label is-inline">Upload Image</span>
        </span>
      </label>
    </div>
  )

  return (
    <>
      <h2 className="title is-4">Profile Picture</h2>
      <div className="columns">
        <div className="column is-half">
          <figure className="image is-128x128 profilePic">
            <img src={placeholderProfilePic} alt="User Thumbnail" />
          </figure>
        </div>

        <div className="column is-half">
          <RemoveBtn />
          <UploadImageBtn />
        </div>
      </div>
    </>
  )
}

const WrappedTab = (props) => (
  <FormWrapper
    FieldsComponent={ImagesTab}
    LargeWidth={true}
    {...props}
    hideButtons
  />
)

export default WrappedTab

import React, { useState } from "react"
import { uploadImageToFirebase, deleteImageFromFirebase } from "api/firebase"
import FormWrapper from "components/ui/AccountFormWrapper/AccountFormWrapper"

import { MdDelete as DeleteIcon } from "react-icons/md"
import { BiImageAdd } from "react-icons/bi"

import constants from "config/constants"
const { DATA_KEYS } = constants
const idKey = DATA_KEYS["USER_ID"]

const extractUserImages = (userObj) => {
  const imageKey = DATA_KEYS["USER_PICTURES"]
  if (userObj && typeof userObj === "object" && userObj[imageKey]) {
    return userObj[imageKey]
  }
  return []
}

const getBase64 = (file, handleImageAdd) => {
  return new Promise((resolve) => {
    let fileInfo
    let baseURL = ""
    // Make new FileReader
    let reader = new FileReader()

    // Convert the file to base64 text
    reader.readAsDataURL(file)

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      baseURL = reader.result
      uploadImageToFirebase(baseURL, (firebaseLink) => {
        handleImageAdd(firebaseLink)
      })

      resolve(baseURL)
    }
  })
}

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
  const images = extractUserImages(formEntries)

  const min = 0
  const max = images.length - 1
  const imageCountMax = 9

  const updateImageArray = (newArray) => {
    setMadeChange(true)
    setFormEntries((prevEntries) => {
      const newEntries = {
        ...prevEntries,
        [DATA_KEYS["USER_PICTURES"]]: newArray,
      }
      manualSubmit(newEntries)

      return newEntries
    })
  }

  const handleImageAdd = (newImage) => {
    const extendedImages = [...images, newImage]
    updateImageArray(extendedImages)
  }

  const handleDelete = (e, imageSrc) => {
    e.preventDefault()

    deleteImageFromFirebase(imageSrc, userId, () => {
      const filteredImages = images.filter((image) => image !== imageSrc)
      updateImageArray(filteredImages)
    })
  }

  const swapElements = (arr, from, to) => {
    arr.splice(from, 1, arr.splice(to, 1, arr[from])[0])
  }

  const scrollImage = (e, imageSrc, index, scrollDirection) => {
    e.preventDefault()

    if (scrollDirection < 0) {
      const newImages = images.slice()
      swapElements(newImages, index, index - 1)
      updateImageArray(newImages)
    } else if (scrollDirection > 0) {
      const newImages = images.slice()
      swapElements(newImages, index, index + 1)
      updateImageArray(newImages)
    }
  }

  return (
    <>
      <div className="">
        {images.map((imageSrc, i) => (
          <div className="tile mx-auto" key={i}>
            <div className="card">
              <div className="card-image">
                <figure className="image mx-auto is-128x128">
                  <img src={imageSrc} alt="User Thumbnail" />
                </figure>
              </div>

              <div className="card-content">
                <button
                  onClick={(e) => scrollImage(e, imageSrc, i, -1)}
                  disabled={i === min}
                  className="button is-info is-pulled-left"
                >
                  {"<"}
                </button>

                <button
                  className="button is-danger is-medium"
                  onClick={(e) => handleDelete(e, imageSrc)}
                >
                  <DeleteIcon />
                </button>

                <button
                  onClick={(e) => scrollImage(e, imageSrc, i, 1)}
                  disabled={i === max}
                  className="button is-info is-pulled-right"
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="tile">
        {images.length < imageCountMax && (
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
                    // getBase64(imageFile, handleImageAdd)
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
        )}
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

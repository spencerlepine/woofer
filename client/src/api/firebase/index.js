import { auth, storage } from "config/firebase"
import randomString from "string-random"

export const uploadImageToFirebase = (newFile, userId, successCallback) => {
  const randomFileName = randomString(16, { numbers: false })

  const imageName = `${randomFileName}.png`
  const storageRef = storage.ref(`/images/${userId}/${imageName}`)

  if (storageRef.put) {
    storageRef
      .put(newFile)
      .then(() => {
        storageRef.getDownloadURL().then((url) => {
          console.log(url)
          successCallback(url)
        })
      })
      .catch((error) => console.log(error))
  }
}

export const deleteImageFromFirebase = (
  imageUrl,
  userId,
  successCallback = () => {}
) => {
  const imagePathRegex = new RegExp(/(.+)%2(.+).png/)
  const validImageUrl = (imageUrl.match(imagePathRegex) || []).length > 0
  if (validImageUrl) {
    const imageFile = imageUrl.match(imagePathRegex)[2].substring(1)

    const storageRef = storage.ref(`/images/${userId}/${imageFile}.png`)

    if (storageRef.delete) {
      storageRef
        .delete()
        .then(() => {
          successCallback()
        })
        .catch((error) => console.log(error))
    }
  }
}

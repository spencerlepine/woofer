import { auth, storage } from "config/firebase"

const uniqueString = () => {
  const makeId = (length) => {
    var result = ""
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  return makeId(25)
}

export const uploadImageToFirebase = (newFile, userId, successCallback) => {
  const randomFileName = uniqueString()

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

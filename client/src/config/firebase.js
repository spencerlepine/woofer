import firebase from "firebase/app"
import "firebase/storage"
import "firebase/auth"
import "firebase/firestore"

let app = null

const validFirebaseConfig =
  process.env.REACT_APP_FIREBASE_API_KEY !== undefined &&
  process.env.REACT_APP_FIREBASE_AUTH_DOMAIN !== undefined &&
  process.env.REACT_APP_FIREBASE_PROJECT_ID !== undefined &&
  process.env.REACT_APP_FIREBASE_STORAGE_BUCKET !== undefined &&
  process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID !== undefined &&
  process.env.REACT_APP_FIREBASE_APP_ID !== undefined &&
  process.env.REACT_APP_FIREBASE_MEASUREMENT_ID !== undefined

if (validFirebaseConfig) {
  const configuredFirebase = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  })
  app = configuredFirebase
} else {
  console.error("Unable to configure Firebase")
  app = {
    auth: () => null,
  }
}

export default app

export const auth = app.auth()

let DATABASE_EXPORT = {}
try {
  const dbConfig = firebase.firestore()
  DATABASE_EXPORT = dbConfig
} catch (err) {
  console.log(err)
}

export const db = DATABASE_EXPORT

let STORAGE_EXPORT = {}
try {
  const storageConfig = firebase.storage()
  STORAGE_EXPORT = storageConfig
} catch (err) {
  console.log(err)
}

export const storage = STORAGE_EXPORT

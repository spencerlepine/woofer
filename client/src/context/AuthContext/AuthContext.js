import React, { useState, useContext, useEffect } from "react"
import PropTypes from "prop-types"
import * as authUser from "api/account"
import * as zipCodes from "api/zipcodes"
import mockUser from "./mockUser"

export const AuthContext = React.createContext()

const isDevMode = process.env.NODE_ENV === "test"
const startUser = isDevMode ? mockUser : null

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(startUser)
  const [accountDetails, setAccountDetails] = useState({})
  const [loading, setLoading] = useState(true)

  const getAccountDetails = () => {
    setLoading(true)
    authUser.fetchUserProfileRecord((userProfile) => {
      setCurrentUser((prevCurrentUser) => ({
        ...prevCurrentUser,
        ...userProfile,
      }))

      setAccountDetails((prevDetails) => ({
        ...prevDetails,
        ...userProfile,
      }))
      setLoading(false)
    })
  }

  useEffect(() => {
    authUser.checkLoginStatus((authenicatedUser) => {
      if (authenicatedUser) {
        setCurrentUser(authenicatedUser)
        getAccountDetails()
      }
    }, [])
  }, [])

  function loginUser(email, password) {
    setLoading(true)
    authUser.signInWithEmailAndPassword(email, password, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
  }

  function signupUser(firstName, lastName, username, email, password) {
    const accountDetails = {
      email,
      username,
      firstName,
      lastName,
    }
    const displayName = `${firstName} ${lastName}`

    setLoading(true)
    authUser.createUserWithEmailAndPassword(
      displayName,
      email,
      password,
      accountDetails,
      (user) => {
        setCurrentUser(accountDetails)
        setLoading(false)
      }
    )
  }

  const updateAccountDetails = (newDetails, successCallback) => {
    setLoading(true)
    authUser.updateUserProfileRecord(newDetails, ({ userProfile }) => {
      setCurrentUser((currentUser) => ({
        ...currentUser,
        ...userProfile,
      }))
      successCallback(userProfile)
      setLoading(false)
    })
  }

  function updateProfilePic(newFile) {
    // Updating the firebase profile picture value
    // Not needed for now
    // This is handle inside the component, stored in Firebase Storage then as a link in mongoDB
  }

  const logoutUser = () => {
    setLoading(true)
    authUser.signOut()
    setCurrentUser(null)
    window.location.reload()
    setLoading(false)
  }

  function resetPassword(email) {
    // setLoading(true)
    // authUser.sendPasswordResetEmail(email, () => {
    //   setLoading(false)
    // })
  }

  function updateEmail(email) {
    // setLoading(true)
    // authUser.updateEmail(email, (user) => {
    //   setCurrentUser(user)
    //   setLoading(false)
    // })
  }

  function updatePassword(password) {
    // setLoading(true)
    // authUser.updatePassword(password, () => {
    //   setLoading(false)
    // })
  }

  const addUserToZipPool = (newZipCode, successCallback) => {
    setLoading(true)
    zipCodes.addUserToZipcode(newZipCode, () => {
      successCallback()
      setLoading(false)
    })
  }

  const removeUserFromZipPool = (oldZipCode, successCallback) => {
    setLoading(true)
    zipCodes.removeUserFromZipcode(oldZipCode, () => {
      successCallback()
      setLoading(false)
    })
  }

  const value = {
    addUserToZipPool,
    removeUserFromZipPool,
    loading,
    accountDetails,
    resetPassword,
    updatePassword,
    updateEmail,
    currentUser,
    loginUser,
    logoutUser,
    signupUser,
    getAccountDetails,
    updateAccountDetails,
    updateProfilePic,
    refreshDetails: getAccountDetails,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)

export default useAuth

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

import React, { useState, useEffect } from "react"
import useAuth, { AuthProvider } from "context/AuthContext/AuthContext"
import Tabs from "./Tabs"
import GeneralTab from "./GeneralTab/GeneralTab"

import constants from "config/constants"
const { DATA_KEYS } = constants
const idKey = DATA_KEYS["USER_ID"]

const extractUserImages = (userObj) => {
  const imageKey = DATA_KEYS["USER_IMAGES"]
  if (userObj && typeof userObj === "object" && userObj[imageKey]) {
    return userObj[imageKey]
  }
  return []
}

const tabs = {
  general: "General",
  images: "Images",
  preferences: "Preferences",
}

const Profile = () => {
  const [currentTab, setCurrentTab] = useState("general")

  const { currentUser, accountDetails, updateAccountDetails } = useAuth()
  const [formEntries, setFormEntries] = useState({})

  const images = extractUserImages(accountDetails)

  useEffect(() => {
    setFormEntries((prevEntries) => ({
      ...prevEntries,
      ...accountDetails,
    }))
  }, [accountDetails])

  const ImagesTab = () => <></>
  const PreferencesTab = () => <></>

  return (
    <div className="hero-body general-settings">
      <div className="container">
        <div className="profile">
          <Tabs tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />

          {currentTab === "general" && (
            <GeneralTab
              updateAccountDetails={updateAccountDetails}
              accountDetails={accountDetails}
              currentUser={currentUser}
              formEntries={formEntries}
              setFormEntries={setFormEntries}
            />
          )}

          {currentTab === "images" && <ImagesTab />}

          {currentTab === "preferences" && <PreferencesTab />}
        </div>
      </div>
    </div>
  )
}

const WrappedSwiper = (props) => (
  <AuthProvider>
    <Profile {...props} />
  </AuthProvider>
)

export default WrappedSwiper

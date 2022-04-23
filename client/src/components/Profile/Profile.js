import React, { useState } from "react"
import Tabs from "./Tabs"
import GeneralTab from "./GeneralTab/GeneralTab"
import PreferenceTab from "./PreferenceTab/PreferenceTab"

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

  // const images = extractUserImages(accountDetails

  const ImagesTab = () => <></>

  return (
    <div className="hero-body general-settings">
      <div className="container">
        <div className="profile">
          <Tabs tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />

          {currentTab === "general" && <GeneralTab />}

          {currentTab === "images" && <ImagesTab />}

          {currentTab === "preferences" && <PreferenceTab />}
        </div>
      </div>
    </div>
  )
}

export default Profile

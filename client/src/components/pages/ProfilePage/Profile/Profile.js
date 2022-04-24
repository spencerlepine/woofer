import React, { useState } from "react"
import Tabs from "./Tabs"
import GeneralTab from "./GeneralTab/GeneralTab"
import ImagesTab from "./ImagesTab/ImagesTab"
import PreferenceTab from "./PreferenceTab/PreferenceTab"

const tabs = [
  {
    value: "general",
    title: "General",
  },
  {
    value: "images",
    title: "Images",
  },
  {
    value: "preferences",
    title: "Preferences",
  },
]

const Profile = () => {
  const [currentTab, setCurrentTab] = useState("general")
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

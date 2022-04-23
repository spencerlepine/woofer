import React, { useState } from "react"

const Tabs = ({ tabs, currentTab, setCurrentTab }) => {
  return (
    <div className="tabs is-left is-toggle is-medium">
      <ul>
        <li
          className={`${currentTab === "general" ? "is-active" : ""}`}
          onClick={() => setCurrentTab("general")}
        >
          <a>{tabs["general"]}</a>
        </li>
        <li
          className={`${currentTab === "images" ? "is-active" : ""}`}
          onClick={() => setCurrentTab("images")}
        >
          <a>{tabs["images"]}</a>
        </li>
        <li
          className={`${currentTab === "preferences" ? "is-active" : ""}`}
          onClick={() => setCurrentTab("preferences")}
        >
          <a>{tabs["preferences"]}</a>
        </li>
      </ul>
    </div>
  )
}

export default Tabs

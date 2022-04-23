import React, { useState } from "react"

const Tabs = ({ tabs, currentTab, setCurrentTab }) => {
  return (
    <div className="tabs is-left is-toggle is-medium">
      <ul>
        {tabs.map(({ value, title }, i) => (
          <li
            key={i}
            className={`${currentTab === value ? "is-active" : ""}`}
            onClick={() => setCurrentTab(value)}
          >
            <a>{title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tabs

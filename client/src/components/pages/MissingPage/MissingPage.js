import React from "react"
import { BiError } from "react-icons/bi"

const MissingPage = () => (
  <div className="hero-body general-settings">
    <div className="container">
      <div className="MissingPage section">
        <BiError className="icon is-large is-danger" />
        <p>This page does not exist!</p>
      </div>
    </div>
  </div>
)

export default MissingPage

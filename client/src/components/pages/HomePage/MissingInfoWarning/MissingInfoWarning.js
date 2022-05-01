import React, { useState } from "react"
import useAuth from "context/AuthContext/AuthContext"
import { Link } from "react-router-dom"
import * as ROUTES from "config/routeConstants"
import { MdNotListedLocation as ZipcodeIcon } from "react-icons/md"
import { ImFilePicture as ImageIcon } from "react-icons/im"
import { RiErrorWarningLine as WarningIcon } from "react-icons/ri"

const hasValidZipcodes = (userObj) => {
  try {
    const { zipcodes } = userObj
    return Array.isArray(zipcodes) && zipcodes.length > 0
  } catch (err) {
    return false
  }
}

const hasValidPictures = (userObj) => {
  try {
    const { pictures } = userObj
    return Array.isArray(pictures) && pictures.length > 0
  } catch (err) {
    return false
  }
}

const MissingInfoWarning = () => {
  const [renderWarning, setRenderWarning] = useState(true)
  const { accountDetails } = useAuth()

  const hasNoZipcodes = !hasValidZipcodes(accountDetails)
  const hasNoPictures = !hasValidPictures(accountDetails)

  const hideWarning = () => {
    setRenderWarning(false)
  }

  return (
    <>
      <div className="columns my-2">
        <div className="column is-half mx-auto">
          {renderWarning && (
            <article className="message is-warning">
              <div className="message-header">
                <span className="is-inline">
                  <h2>
                    <WarningIcon className="icon my-auto" /> Missing Account Info!
                  </h2>
                </span>

                <button
                  className="delete"
                  ariaLabel="delete"
                  onClick={hideWarning}
                ></button>
              </div>
              <div className="message-body">
                {hasNoZipcodes && (
                  <Link to={ROUTES.PROFILE} className="button is-warning">
                    <ZipcodeIcon />
                    <p className="px-1">Add Zipcodes</p>
                  </Link>
                )}
                {hasNoPictures && (
                  <Link to={ROUTES.PROFILE} className="button is-warning">
                    <ImageIcon />
                    <p className="px-1">Add Pictures</p>
                  </Link>
                )}
              </div>
            </article>
          )}
        </div>
      </div>
    </>
  )
}

export default MissingInfoWarning

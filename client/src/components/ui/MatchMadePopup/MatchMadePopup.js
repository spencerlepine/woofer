import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import * as ROUTES from "config/routeConstants"
import constants from "config/constants"
import Popup from "components/ui/Popup/Popup"
import { formatAgeStr, titleCaseDisplayName } from "utils"
import { FaGenderless, FaMars, FaVenus } from "react-icons/fa"
const { DATA_KEYS } = constants

const GenerateGenderIcon = ({ gender }) => {
  if (gender.toLowerCase === "male") {
    return <FaMars />
  } else if (gender.toLowerCase() === "female") {
    return <FaVenus />
  }
  return <FaGenderless />
}

export const MatchMadePopup = ({ user, chatId, closePopup, renderMe }) => {
  const {
    [DATA_KEYS["USER_PROFILE_PIC"]]: profilePic,
    [DATA_KEYS["USER_FIRST_NAME"]]: firstName,
    [DATA_KEYS["USER_GENDER"]]: gender,
    [DATA_KEYS["USER_LAST_NAME"]]: lastName,
    [DATA_KEYS["USER_BIRTHYEAR"]]: birthyear,
    [DATA_KEYS["USER_ZODIAC"]]: zodiac,
  } = user

  const formattedAge = formatAgeStr(birthyear)
  const formattedName = titleCaseDisplayName(firstName, lastName)
  const chatPageURL = ROUTES.CHAT + `?roomId=${chatId}`

  return (
    <Popup
      manualDisplay={renderMe}
      DefaultElem={<React.Fragment></React.Fragment>}
      PopupElem={
        <>
          <h3>Match Made!</h3>

          <img src={profilePic} alt="Profile Picture"></img>

          <h4>{formattedName}</h4>
          <p>{formattedAge}</p>
          <p>{zodiac}</p>
          <GenerateGenderIcon gender={gender} />

          <div className="popupMatchButtons">
            <button onClick={closePopup}>View Later</button>

            <Link to={chatPageURL}>
              <p>Open Chat</p>
            </Link>
          </div>
        </>
      }
    />
  )
}

export default MatchMadePopup

MatchMadePopup.propTypes = {
  user: PropTypes.object.isRequired,
  closePopup: PropTypes.func.isRequired,
  chatId: PropTypes.string.isRequired,
  renderMe: PropTypes.bool.isRequired,
}

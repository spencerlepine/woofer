import { Link } from "react-router-dom"
import * as ROUTES from "config/routeConstants"
import constants from "config/constants"
import Popup from "components/ui/Popup/Popup"
import { formatAgeStr, titleCaseDisplayName } from "utils"
import { FaGenderless, FaMars, FaVenus } from "react-icons/fa"
const { DATA_KEYS } = constants

import UserInfo from "components/UserInfo/UserInfo"

const GenerateGenderIcon = ({ gender }) => {
  if (gender.toLowerCase === "male") {
    return <FaMars />
  } else if (gender.toLowerCase() === "female") {
    return <FaVenus />
  }
  return <FaGenderless />
}

const MatchModal = ({ user, chatId }) => {
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
    <>
      <div className="popupMatchButtons">
        <Link to={chatPageURL} className="button is-success">
          <p>Open Chat</p>
        </Link>
      </div>

      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <figure>
              <img src={profilePic} alt="Profile Picture" className="image"></img>
            </figure>
          </div>
        </div>
      </div>

      <GenerateGenderIcon gender={gender} />
      <UserInfo user={user} />
    </>
  )
}

export default MatchModal

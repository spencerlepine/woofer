import { Link } from "react-router-dom"
import * as ROUTES from "config/routeConstants"
import Popup from "components/ui/Popup/Popup"
import { formatAgeStr, titleCaseDisplayName } from "utils"
import { FaGenderless, FaMars, FaVenus } from "react-icons/fa"

import UserInfo from "components/ui/UserInfo/UserInfo"

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
    profilePicture: profilePic,
    firstName: firstName,
    gender: gender,
    lastName: lastName,
    birthday: birthyear,
    zodiac: zodiac,
    userId,
  } = user

  const formattedAge = formatAgeStr(birthyear)
  const formattedName = titleCaseDisplayName(firstName, lastName)
  const chatPageURL = `${ROUTES.CHAT}/${chatId}/${userId}`

  return (
    <>
      <div className="popupMatchButtons">
        <Link to={chatPageURL} className="button is-success">
          <p>Open Chat</p>
        </Link>
      </div>

      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
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

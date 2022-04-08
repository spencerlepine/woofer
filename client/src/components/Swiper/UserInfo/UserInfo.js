import React, { useState } from "react"
import PropTypes from "prop-types"
import { formatAgeStr, titleCaseDisplayName } from "utils"
import constants from "config/constants"
const { DATA_KEYS } = constants

const UserInfo = ({ user }) => {
  const [showDetails, setShowDetails] = useState(true)

  const {
    [DATA_KEYS["USER_FIRST_NAME"]]: firstName,
    [DATA_KEYS["USER_LAST_NAME"]]: lastName,
    [DATA_KEYS["USER_ZODIAC"]]: zodiac,
    [DATA_KEYS["USER_BIRTHYEAR"]]: birthyear,
    // [DATA_KEYS["USER_GENDER"]]: gender,
    [DATA_KEYS["USER_BREED"]]: breed,
    [DATA_KEYS["USER_BIO"]]: bio,
  } = user

  const formattedName = titleCaseDisplayName(firstName, lastName)
  const formattedAge = formatAgeStr(birthyear)

  return (
    <div className="userInfo">
      <h3>{formattedName}</h3>

      <button onClick={() => setShowDetails(!showDetails)}>Collapse</button>

      {showDetails && (
        <div>
          <h5>{formattedAge}</h5>
          <h5>{zodiac}</h5>
          <h5>{breed}</h5>
          <p>{bio}</p>
        </div>
      )}
    </div>
  )
}

export default UserInfo

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
}

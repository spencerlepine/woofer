import React, { useState } from "react"
import PropTypes from "prop-types"
import { VscCollapseAll, VscExpandAll } from "react-icons/vsc"
import { formatAgeStr, titleCaseDisplayName, capitalizeStr } from "utils"
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
    [DATA_KEYS["USER_BREED"]]: breedUnformatted,
    [DATA_KEYS["USER_BIO"]]: bio,
  } = user

  const breed = capitalizeStr(breedUnformatted)
  const formattedName = titleCaseDisplayName(firstName, lastName)
  const formattedAge = formatAgeStr(birthyear)

  return (
    <div className="card-content">
      <div className="card-content">
        <h3 className="card-header-title is-centered">{formattedName}</h3>

        <p className="">{bio}</p>
      </div>

      <div className="userInfo content">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="button is-info"
        >
          Collapse
          {showDetails ? <VscCollapseAll /> : <VscExpandAll />}
        </button>

        {showDetails && (
          <div className="card-footer">
            <h5 className="card-footer-item">{formattedAge}</h5>
            <h5 className="card-footer-item">{zodiac}</h5>
            <h5 className="card-footer-item">{breed}</h5>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserInfo

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
}

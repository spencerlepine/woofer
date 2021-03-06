import React, { useState } from "react"
import PropTypes from "prop-types"
import { VscCollapseAll, VscExpandAll } from "react-icons/vsc"
import { formatAgeStr, titleCaseDisplayName, capitalizeStr } from "utils"
import { FaGenderless, FaMars, FaVenus } from "react-icons/fa"

const GenerateGenderIcon = ({ gender }) => {
  if (gender.toLowerCase() === "male") {
    return <FaMars className="has-text-info" />
  } else if (gender.toLowerCase() === "female") {
    return <FaVenus className="has-text-info" />
  }
  return <FaGenderless className="has-text-info" />
}

const UserInfo = ({ user }) => {
  const [showDetails, setShowDetails] = useState(true)

  const {
    firstName,
    lastName,
    zodiac,
    gender,
    birthday: birthyear,
    breed: breedUnformatted,
    bio,
  } = user

  const breed = capitalizeStr(breedUnformatted)
  const formattedName = titleCaseDisplayName(firstName, lastName)
  const formattedAge = formatAgeStr(birthyear)

  return (
    <>
      <div className="card-content">
        <h3 className="card-header-title is-centered">
          {formattedName} <GenerateGenderIcon gender={gender} />
        </h3>

        <p className="">{bio}</p>
      </div>

      <div className="userInfo content">
        <div className="card-footer">
          {/* <button
            onClick={() => setShowDetails(!showDetails)}
            className="button is-info"
          >
            Collapse
            {showDetails ? <VscCollapseAll /> : <VscExpandAll />}
          </button> */}

          {showDetails && (
            <>
              <h5 className="card-footer-item">{formattedAge}</h5>
              <h5 className="card-footer-item">{zodiac}</h5>
              <h5 className="card-footer-item">{breed}</h5>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default UserInfo

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
}

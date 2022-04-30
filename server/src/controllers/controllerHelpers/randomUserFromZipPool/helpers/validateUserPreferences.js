const { DATA_KEYS } = require("../../../../../config/constants")

const validateUserPreferences = (thisUserProfile, thatUserProfile) => {
  const thisUserGender = thisUserProfile[DATA_KEYS["USER_GENDER"]]
  const thatUserGender = thatUserProfile[DATA_KEYS["USER_GENDER"]]

  const thisUserGenderPref = thisUserProfile[DATA_KEYS["USER_PREFERENCE"]]
  const thatUserGenderPref = thatUserProfile[DATA_KEYS["USER_PREFERENCE"]]

  return (
    thisUserGender === thatUserGenderPref && thatUserGender === thisUserGenderPref
  )
}

module.exports = validateUserPreferences

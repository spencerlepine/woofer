const filterUserProfile = (userProfileObj, DATA_KEYS) => {
  const unfiltered = userProfileObj
  return {
    userId: unfiltered["userId"],
    username: unfiltered["username"],
    firstName: unfiltered["firstName"],
    lastName: unfiltered["lastName"],
    zodiac: unfiltered["zodiac"],
    gender: unfiltered["gender"],
    breed: unfiltered["breed"],
    bio: unfiltered["bio"],
    birthday: unfiltered["birthday"],
    profilePicture: unfiltered["profilePicture"],
  }
}

module.exports = filterUserProfile

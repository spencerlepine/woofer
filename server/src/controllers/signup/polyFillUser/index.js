const polyFillUser = (userObj) => {
  const mockUser = {
    username: "anonymous",
    lastName: "John",
    firstName: "Doe",
    profilePicture:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
    zodiac: "Virgo",
    gender: "Male",
    breed: "Unknown",
    bio: "Something about me :D",
    birthday: "06/12/2002",
    preference: "Female",
    zipcodes: [],
    pictures: [],
    chats: [],
  }

  return {
    ...mockUser,
    ...userObj,
  }
}

module.exports = polyFillUser

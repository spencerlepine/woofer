const polyFillUser = (userObj) => {
  const mockUser = {
    username: "anonymous",
    lastName: "John",
    firstName: "Doe",
    profilePicture:
      "https://www.bing.com/th?id=OIP.EQq_JNDqxUVzS4aszkfoDAHaHa&w=150&h=160&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
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

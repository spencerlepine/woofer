const mockUser = {
  uid: "asdf123456",
  emailVerified: true,
  userId: "1234asdfuasdf",
  email: "johndoe@gmail.com",
  username: "john124412",
  firstName: "John",
  lastName: "Doe",
  profilePicture:
    "https://www.bing.com/th?id=OIP.EQq_JNDqxUVzS4aszkfoDAHaHa&w=150&h=160&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
  zodiac: "Virgo",
  gender: "Male",
  breed: "Shiba",
  bio: "Example description",
  birthday: "06/12/2002",
  preference: "Female",
  zipcodes: [],
  pictures: [],
  chats: [],
}

jest.mock("mockUser", () => mockUser)

export default mockUser

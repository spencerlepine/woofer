import constants from "config/constants"
const { DATA_KEYS } = constants

const mockUser = {
  uid: "asdf123456",
  emailVerified: true,
  [DATA_KEYS["USER_ID"]]: "1234asdfuasdf",
  [DATA_KEYS["USER_EMAIL"]]: "johndoe@gmail.com",
  [DATA_KEYS["USER_NAME"]]: "john124412",
  [DATA_KEYS["USER_FIRST_NAME"]]: "John",
  [DATA_KEYS["USER_LAST_NAME"]]: "Doe",
  [DATA_KEYS["USER_PROFILE_PIC"]]:
    "https://www.bing.com/th?id=OIP.EQq_JNDqxUVzS4aszkfoDAHaHa&w=150&h=160&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
  [DATA_KEYS["USER_ZODIAC"]]: "Virgo",
  [DATA_KEYS["USER_GENDER"]]: "Male",
  [DATA_KEYS["USER_BREED"]]: "Shiba",
  [DATA_KEYS["USER_BIO"]]: "Example description",
  [DATA_KEYS["USER_BIRTHDAY"]]: "06/12/2002",
  [DATA_KEYS["USER_PREFERENCE"]]: "Female",
  [DATA_KEYS["USER_ZIPCODES"]]: [],
  [DATA_KEYS["USER_PICTURES"]]: [],
  [DATA_KEYS["USER_CHATS"]]: [],
}

export default mockUser

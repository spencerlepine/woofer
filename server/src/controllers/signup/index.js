const DogUser = require("../../models/DogUser")
const { DATA_KEYS } = require("../../../config/constants")
const verifyEndpointRequest = require("../../utils/verifyEndpointRequest")
const createUserDocument = require("../controllerHelpers/user/createUserDocument")

const mockUser = {
  [DATA_KEYS["USER_NAME"]]: "john1234",
  [DATA_KEYS["USER_FIRST_NAME"]]: "John",
  [DATA_KEYS["USER_LAST_NAME"]]: "Doe",
  [DATA_KEYS["USER_PROFILE_PIC"]]:
    "https://www.bing.com/th?id=OIP.EQq_JNDqxUVzS4aszkfoDAHaHa&w=150&h=160&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
  [DATA_KEYS["USER_ZODIAC"]]: "Virgo",
  [DATA_KEYS["USER_GENDER"]]: "Male",
  [DATA_KEYS["USER_BREED"]]: "Shiba",
  [DATA_KEYS["USER_BIO"]]: "Something about me :D",
  [DATA_KEYS["USER_BIRTHYEAR"]]: "06/12/2002",
  [DATA_KEYS["USER_PREFERENCE"]]: "Female",
  [DATA_KEYS["USER_ZIPCODES"]]: [],
  [DATA_KEYS["USER_PICTURES"]]: [],
  [DATA_KEYS["USER_CHATS"]]: [],
}

const idKey = DATA_KEYS["USER_ID"]

module.exports = {
  signupUser: (req, res) => {
    const polyfillUserRequest = {
      ...mockUser,
      ...req.body,
    }

    const query = { [idKey]: req.body[idKey] }

    const update = {
      $set: polyfillUserRequest,
    }
    const options = { upsert: true, multi: true }

    const endpointObj = {
      endpointPathKeys: ["SIGNUP"],
      method: "POST",
    }

    verifyEndpointRequest(req, res, endpointObj, () => {
      createUserDocument(res, query, update, options, () => {
        res.status(201).json("Successfully created user account")
      })
    })
  },
}

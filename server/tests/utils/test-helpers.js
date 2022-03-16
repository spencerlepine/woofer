const { DATA_KEYS } = require("../../config/constants")

const mockUser = {
  [DATA_KEYS["USER_ID"]]: "john124412",
  [DATA_KEYS["USER_EMAIL"]]: "johndoe@gmail.com",
  [DATA_KEYS["USER_NAME"]]: "john124412",
  [DATA_KEYS["USER_ZODIAC"]]: "Virgo",
  [DATA_KEYS["USER_GENDER"]]: "Male",
  [DATA_KEYS["USER_BREED"]]: "Shiba",
  [DATA_KEYS["USER_BIO"]]: "Example description",
  [DATA_KEYS["USER_BIRTHYEAR"]]: 2002,
  [DATA_KEYS["USER_PREFERENCE"]]: "Female",
  [DATA_KEYS["USER_ZIPCODES"]]: [],
  [DATA_KEYS["USER_PICTURES"]]: [],
  [DATA_KEYS["USER_CHATS"]]: [],
}

module.exports = {
  app: require("../../src/app"),
  constants: require("../../config/constants"),
  verifyEndpointResponse: require("../../src/utils/verifyEndpointResponse"),
  mockUser: mockUser,
  signupMockUser: (request, app, endpointURLStr, done) => {
    const method = "POST"
    const endpointPaths = ["SIGNUP"]
    const url = endpointURLStr(endpointPaths, method)

    request(app)
      .post(url)
      .send(mockUser)
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  },
}

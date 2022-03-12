const DogUser = require('../../models/DogUser');
const { DATA_KEYS } = require('../../../config/constants')
const verifyEndpointRequest = require('../../utils/verifyEndpointRequest');
const logger = require('../../../config/logger')

const mockUser = {
  [DATA_KEYS["USER_NAME"]]: 'john1234',
  [DATA_KEYS["USER_ZODIAC"]]: "Virgo",
  [DATA_KEYS["USER_GENDER"]]: "Male",
  [DATA_KEYS["USER_BREED"]]: "Shiba",
  [DATA_KEYS["USER_BIO"]]: "Example description",
  [DATA_KEYS["USER_BIRTHYEAR"]]: 2002,
  [DATA_KEYS["USER_PREFERENCE"]]: "Female",
  [DATA_KEYS["USER_ZIPCODES"]]: [],
  [DATA_KEYS["USER_PICTURES"]]: [],
  [DATA_KEYS["USER_CHATS"]]: [],
};

module.exports = {
  signupUser: (req, res) => {
    const id = DATA_KEYS["USER_ID"];

    const polyfillUserRequest = {
      ...mockUser,
      ...req.body
    }
    const validRequestCheck = verifyEndpointRequest({ body: polyfillUserRequest }, ['SIGNUP'], 'POST');

    if (validRequestCheck === true) {
      const query = {
        [id]: req.body[id]
      };
      const update = {
        $set: polyfillUserRequest
      };
      const options = { upsert: true, multi: true };

      DogUser.updateOne(query, update, options)
        .then(
          (result) => {
            if (result.upsertedId) {
              res.status(201).json('Successfully created user account')
            } else {
              res.status(409).json('User account already exists!')
            }
          },
          err => console.error(`Something went wrong: ${err}`),
        );
    } else {
      res.status(400).json(validRequestCheck)
    }
  },
}

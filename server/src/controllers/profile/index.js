const DogUser = require('../../models/DogUser');
const { DATA_KEYS } = require('../../../config/constants')
const verifyEndpointRequest = require('../../utils/verifyEndpointRequest')
const verifyEndpointResponse = require('../../utils/verifyEndpointResponse')

const logger = require('../../../config/logger')

const filterProfileKeys = (userProfileObj) => {
  const u = userProfileObj;
  return {
    [DATA_KEYS["USER_ID"]]: u[DATA_KEYS["USER_ID"]],
    [DATA_KEYS["USER_NAME"]]: u[DATA_KEYS["USER_NAME"]],
    [DATA_KEYS["USER_ZODIAC"]]: u[DATA_KEYS["USER_ZODIAC"]],
    [DATA_KEYS["USER_GENDER"]]: u[DATA_KEYS["USER_GENDER"]],
    [DATA_KEYS["USER_BREED"]]: u[DATA_KEYS["USER_BREED"]],
    [DATA_KEYS["USER_BIO"]]: u[DATA_KEYS["USER_BIO"]],
    [DATA_KEYS["USER_BIRTHYEAR"]]: u[DATA_KEYS["USER_BIRTHYEAR"]],
  }
}

module.exports = {
  getUserProfile: (req, res) => {
    const id = DATA_KEYS["USER_ID"];

    const validRequestCheck = verifyEndpointRequest(req, ['PROFILE'], 'GET');

    if (validRequestCheck === true) {
      DogUser.findOne({ [id]: req.query[id] })
        .then(
          (result) => {
            if (result) {
              const filteredProfile = filterProfileKeys(result)
              res.status(200).json({ [DATA_KEYS["USER_PROFILE"]]: filteredProfile })
            } else {
              res.status(409).json('Profile not found')
            }
          },
          err => console.error(`Something went wrong: ${err}`),
        );
    } else {
      logger.error(validRequestCheck)
      res.status(400).json(validRequestCheck)
    }
  },
  getFullUserProfile: (req, res) => {
    const id = DATA_KEYS["USER_ID"];

    const validRequestCheck = verifyEndpointRequest(req, ['PROFILE', 'DETAILS'], 'GET');

    if (validRequestCheck === true) {
      DogUser.findOne({ [id]: req.query[id] })
        .then(
          (result) => {
            const response = { [DATA_KEYS["USER_PROFILE"]]: result };

            if (result && verifyEndpointResponse(response, ['PROFILE', 'DETAILS'], 'GET')) {
              res.status(200).json(response)
            } else {
              res.status(409).json('Profile not found')
            }
          },
          err => console.error(`Something went wrong: ${err}`),
        );
    } else {
      logger.error(validRequestCheck)
      res.status(400).json(validRequestCheck)
    }
  },
  updateUserProfile: (req, res) => {
    const id = DATA_KEYS["USER_ID"];

    const validRequestCheck = verifyEndpointRequest(req, ['PROFILE', 'DETAILS'], 'POST');

    if (validRequestCheck === true) {
      const query = {
        [id]: req.body[id]
      };
      const tempId = req.body[id]

      // DON'T change the KEY
      if (req.body[DATA_KEYS["USER_ID"]]) {
        delete req.body[DATA_KEYS["USER_ID"]]
      }
      const update = {
        $set: req.body
      };
      const options = {};

      DogUser.updateOne(query, update, options)
        .then(
          (result) => {
            if (result) {
              res.status(201).json({
                [DATA_KEYS["USER_PROFILE"]]: {
                  [DATA_KEYS["USER_ID"]]: tempId,
                  ...req.body
                }
              })
            } else {
              res.status(409).json('Unable to update user record!')
            }
          },
          err => logger.error(`Something went wrong: ${err}`),
        );
    } else {
      logger.error(validRequestCheck)
      res.status(400).json(validRequestCheck)
    }
  },
  deleteUserProfile: (req, res) => {
    const id = DATA_KEYS["USER_ID"];

    const validRequestCheck = verifyEndpointRequest(req, ['PROFILE', 'DETAILS'], 'DELETE');

    if (validRequestCheck === true) {
      const query = {
        [id]: req.body[id]
      };
      const options = { justOne: true };

      DogUser.deleteOne(query, options)
        .then(
          (result) => {
            if (result) {
              res.status(200).json('Successfully deleted user record')
            } else {
              res.status(500).json('Unable to delete user record!')
            }
          },
          err => logger.error(`Something went wrong: ${err}`),
        );
    } else {
      logger.error(validRequestCheck)
      res.status(400).json(validRequestCheck)
    }
  },
}

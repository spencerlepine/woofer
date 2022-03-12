const DogUser = require('../../models/DogUser');
const { DATA_KEYS } = require('../../../config/constants')
const verifyEndpointRequest = require('../../utils/verifyEndpointRequest');

module.exports = {
  getUserProfile: (req, res) => {
    const id = DATA_KEYS["USER_ID"];

    const validRequestCheck = verifyEndpointRequest(req, ['PROFILE'], 'GET');

    if (validRequestCheck === true) {
      DogUser.findOne({ [id]: req.query[id] })
        .then(
          (result) => {
            if (result) {
              res.status(200).json({ [DATA_KEYS["USER_PROFILE"]]: result })
            } else {
              res.status(409).json('Profile not found')
            }
          },
          err => console.error(`Something went wrong: ${err}`),
        );
    } else {
      console.error(validRequestCheck)
      res.status(400).json(validRequestCheck)
    }
  },
  getFullUserProfile: (req, res) => {
    // TODO
    res.status(200).json('The API endpoint worked!')
  },
  updateUserProfile: (req, res) => {
    // TODO
    res.status(200).json('The API endpoint worked!')
  },
  deleteUserProfile: (req, res) => {
    // TODO
    res.status(200).json('The API endpoint worked!')
  },
}

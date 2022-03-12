const verifyEndpointRequest = require('../../utils/verifyEndpointRequest');

module.exports = {
  signupUser: (req, res) => {
    const validRequestCheck = verifyEndpointRequest(req, ['SIGNUP'], 'POST');

    if (validRequestCheck === true) {

      res.status(201).json('The API endpoint worked!')

    } else {
      console.error(validRequestCheck)
      res.status(400).json(validRequestCheck)
    }
  },
}

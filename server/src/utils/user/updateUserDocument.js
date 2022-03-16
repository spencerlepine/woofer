const DogUser = require('../../models/DogUser');
const handleErrorResponse = require('../handleErrorResponse')

const fetchUserDocument = require('./fetchUserDocument')

const updateUserDocument = (res, query, update, options) => {
  return DogUser.updateOne(query, update, options)
    .then(
      (result) => {
        if (result) {
          return fetchUserDocument(res, query)
        } else {
          res.status(409).json('Unable to update user record!')
        }
      },
      (err) => handleErrorResponse(res, `Unable to update user document => ${err}`, 500),
    );
}

module.exports = updateUserDocument;
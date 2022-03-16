const DogUser = require('../../models/DogUser');
const handleErrorResponse = require('../handleErrorResponse')

const createUserDocument = (res, query, update, options, successCallback) => {
  DogUser.updateOne(query, update, options)
    .then(
      (result) => {
        if (result.upsertedId) {
          successCallback()
        } else {
          res.status(409).json('User account already exists!')
        }
      },
      (err) => handleErrorResponse(res, `Unable to sign up this user => ${err}`, 500);
}

module.exports = createUserDocument;
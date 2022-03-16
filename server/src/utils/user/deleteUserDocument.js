const DogUser = require('../../models/DogUser');
const handleErrorResponse = require('../handleErrorResponse')

const deleteUserDocument = (res, query, options) => {
  return DogUser.deleteOne(query, options)
    .then(
      (result) => {
        return result
      },
      (err) => handleErrorResponse(res, `Unable to delete user document => ${err}`, 500),
    );
}

module.exports = deleteUserDocument;
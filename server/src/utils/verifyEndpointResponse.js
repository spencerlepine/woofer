const {
  expectedRequest,
  BODY_KEYS,
  OPT_KEYS,
  PARAM_KEYS,
  RESPONSE_KEYS,
} = require('../../config/constants')

const verifyKeyDataType = require('./verifyKeyDataType')

const errorCallback = require('./handleErrorResponse')

const verifyEndpointReponse = (responseBody, res, { endpointPathKeys, method }, successCallback) => {
  const {
    [RESPONSE_KEYS]: expectedResponseKeys
  } = expectedRequest(endpointPathKeys, method);

  if (expectedResponseKeys === undefined) {
    errorCallback(res, 'ERROR: Endpoint does not expect a response', 500)
  }

  for (let i = 0; i < expectedResponseKeys.length; i += 1) {
    const expectedKey = expectedResponseKeys[i];

    if (responseBody[expectedKey] === undefined) {
      errorCallback(res, `ERROR: response body missing key => ${expectedKey}`, 500)
    }

    if (verifyKeyDataType(expectedKey, responseBody[expectedKey]) === false) {
      errorCallback(res, `ERROR: invalid data type for key => ${expectedKey}`, 500)
    }
  }

  successCallback()
}

module.exports = verifyEndpointReponse;
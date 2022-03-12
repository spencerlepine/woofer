const {
  expectedRequest,
  BODY_KEYS,
  OPT_KEYS,
  PARAM_KEYS,
  RESPONSE_KEYS,
} = require('../../config/constants')

const verifyKeyDataType = require('./verifyKeyDataType')

const verifyEndpointReponse = (responseBody, endpointPathKeys, method) => {
  const {
    [RESPONSE_KEYS]: expectedResponseKeys
  } = expectedRequest(endpointPathKeys, method);

  if (expectedResponseKeys === undefined) {
    return 'ERROR: Endpoint does not expect a response'
  }

  for (let i = 0; i < expectedResponseKeys.length; i += 1) {
    const expectedKey = expectedResponseKeys[i];

    if (responseBody[expectedKey] === undefined) {
      return `ERROR: response body missing key => ${expectedKey}`
    }

    if (verifyKeyDataType(expectedKey, responseBody[expectedKey]) === false) {
      return `ERROR: invalid data type for key => ${expectedKey}`
    }
  }

  return true
}

module.exports = verifyEndpointReponse;
const {
  expectedRequest,
  BODY_KEYS,
  OPT_KEYS,
  PARAM_KEYS,
} = require('../../config/constants')

const verifyKeyDataType = require('./verifyKeyDataType')

const verifyEndpointRequest = (request, endpointPathKeys, method) => {
  const {
    [BODY_KEYS]: expectedBodyKeys,
    [OPT_KEYS]: expectedOptionalKeys,
    [PARAM_KEYS]: expectedParamKeys
  } = expectedRequest(endpointPathKeys, method);

  const expectedKeysArr = [
    {
      requestObj: request['body'],
      key: BODY_KEYS,
      expectedReqKeys: expectedBodyKeys,
      allKeysRequired: true,
    },
    {
      requestObj: request['body'],
      key: OPT_KEYS,
      expectedReqKeys: expectedOptionalKeys,
      allKeysRequired: false,
    },
    {
      requestObj: request['query'],
      key: PARAM_KEYS,
      expectedReqKeys: expectedParamKeys,
      allKeysRequired: true,
    }
  ]

  for (let e = 0; e < expectedKeysArr.length; e += 1) {
    const {
      requestObj,
      key,
      expectedReqKeys,
      allKeysRequired
    } = expectedKeysArr[e];

    if (expectedReqKeys) {
      for (let i = 0; i < expectedReqKeys.length; i += 1) {
        const expectedKey = expectedReqKeys[i];

        if (requestObj[expectedKey] === undefined && allKeysRequired) {
          return `ERROR: request ${key
            } missing key => ${expectedKey}`
        }

        if (verifyKeyDataType(expectedKey, requestObj[expectedKey]) === false) {
          return `ERROR: invalid data type for key => ${expectedKey}`
        }
      }
    }
  }

  return true
}

module.exports = verifyEndpointRequest;
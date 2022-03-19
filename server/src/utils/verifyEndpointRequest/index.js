const {
  expectedRequest,
  BODY_KEYS,
  OPT_KEYS,
  PARAM_KEYS,
} = require("../../../config/constants")

const verifyKeyDataType = require("../verifyKeyDataType")

const errorCallback = require("../handleErrorResponse")

const verifyEndpointRequest = (
  request,
  res,
  { endpointPathKeys, method },
  successCallback
) => {
  // if (!(res.constructor === Object && Object.keys(res).length > 0)) {
  if (typeof res !== "object" || Object.keys(res).length === 0) {
    throw new Error("verifyEndpointRequest given invalid res argument")
  }

  const {
    [BODY_KEYS]: expectedBodyKeys,
    [OPT_KEYS]: expectedOptionalKeys,
    [PARAM_KEYS]: expectedParamKeys,
  } = expectedRequest(endpointPathKeys, method)

  const expectedKeysArr = [
    {
      requestObj: request["body"],
      key: BODY_KEYS,
      expectedReqKeys: expectedBodyKeys,
      allKeysRequired: true,
    },
    {
      requestObj: request["body"],
      key: OPT_KEYS,
      expectedReqKeys: expectedOptionalKeys,
      allKeysRequired: false,
    },
    {
      requestObj: request["query"],
      key: PARAM_KEYS,
      expectedReqKeys: expectedParamKeys,
      allKeysRequired: true,
    },
  ]

  for (let e = 0; e < expectedKeysArr.length; e += 1) {
    const { requestObj, key, expectedReqKeys, allKeysRequired } = expectedKeysArr[e]

    if (expectedReqKeys) {
      for (let i = 0; i < expectedReqKeys.length; i += 1) {
        const expectedKey = expectedReqKeys[i]

        if (requestObj[expectedKey] === undefined && allKeysRequired) {
          errorCallback(
            res,
            `ERROR: request ${key} missing key => ${expectedKey}`,
            400
          )
          return
        }

        if (verifyKeyDataType(expectedKey, requestObj[expectedKey]) === false) {
          errorCallback(
            res,
            `ERROR: invalid data type for key => ${expectedKey}`,
            400
          )
          return
        }
      }
    }
  }

  successCallback()
}

module.exports = verifyEndpointRequest

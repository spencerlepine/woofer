const verifyEndpointRequest = require("./index")

const constants = require("../../../config/constants")
const {
  BODY_KEYS,
  DATA_KEYS,
  OPT_KEYS,
  PARAM_KEYS,
  RESPONSE_KEYS,
  ENDPOINT_ROUTES,
} = constants

describe("Request Validator helper", () => {
  const validEndpointObj = {
    endpointPathKeys: ["SIGNUP"],
    method: "POST",
  }

  const validRequest = {
    body: {
      [DATA_KEYS["USER_ID"]]: "1234asdfuasdf",
      [DATA_KEYS["USER_EMAIL"]]: "johndoe@gmail.com",
    },
  }

  const res = {
    status: () => res,
    json: () => {},
    end: () => {},
    setHeader: () => {},
  }

  test("should invoke success callback with valid arguments", () => {
    const successCallback = jest.fn()
    verifyEndpointRequest(validRequest, res, validEndpointObj, successCallback)
    expect(successCallback.mock.calls.length).toBe(1)
  })

  test('shouldn"t invoke callback with invalid request argument', () => {
    const successCallback = jest.fn()
    expect(() => {
      verifyEndpointRequest("Yeet", res, validEndpointObj, successCallback)
    }).toThrow(Error)
    expect(successCallback.mock.calls.length).toBe(0)
  })

  test("should throw error with invalid res argument", () => {
    const successCallback = jest.fn()
    expect(() => {
      verifyEndpointRequest(validRequest, {}, validEndpointObj, successCallback)
    }).toThrow(Error)
    expect(successCallback.mock.calls.length).toBe(0)
  })

  test("should throw error when given invalid endpoint paths/method object argument", () => {
    const invalidEndpointObj = {
      endpointPathKeys: ["NON_EXISTENT"],
      method: "GET",
    }

    const successCallback = jest.fn()
    expect(() => {
      verifyEndpointRequest("Yeet", res, invalidEndpointObj, successCallback)
    }).toThrow(Error)
    expect(successCallback.mock.calls.length).toBe(0)
  })
})

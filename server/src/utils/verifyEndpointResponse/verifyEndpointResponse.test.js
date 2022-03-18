const verifyEndpointResponse = require("./index")

const constants = require("../../../config/constants")
const { BODY_KEYS, DATA_KEYS, OPT_KEYS, PARAM_KEYS, RESPONSE_KEYS, ENDPOINT_ROUTES } = constants

const mockUser = {
  [DATA_KEYS["USER_ID"]]: "1234asdfuasdf",
  [DATA_KEYS["USER_EMAIL"]]: "johndoe@gmail.com",
  [DATA_KEYS["USER_NAME"]]: "john124412",
  [DATA_KEYS["USER_ZODIAC"]]: "Virgo",
  [DATA_KEYS["USER_GENDER"]]: "Male",
  [DATA_KEYS["USER_BREED"]]: "Shiba",
  [DATA_KEYS["USER_BIO"]]: "Example description",
  [DATA_KEYS["USER_BIRTHYEAR"]]: 2002,
  [DATA_KEYS["USER_PREFERENCE"]]: "Female",
  [DATA_KEYS["USER_ZIPCODES"]]: [],
  [DATA_KEYS["USER_PICTURES"]]: [],
  [DATA_KEYS["USER_CHATS"]]: [],
}

describe("Response Validator helper", () => {
  const validEndpointObj = {
    endpointPathKeys: ["PROFILE"],
    method: "GET"
  }
  const res = {
    status: () => res,
    json: () => { },
    end: () => { },
    setHeader: () => { }
  }
  const validResponse = {
    [DATA_KEYS["USER_PROFILE"]]: mockUser
  }

  test("should invoke success callback with valid arguments", () => {
    const successCallback = jest.fn()
    verifyEndpointResponse(validResponse, res, validEndpointObj, successCallback)
    expect(successCallback.mock.calls.length).toBe(1)
  })

  test("shouldn\"t invoke callback with invalid actualBody argument", () => {
    const successCallback = jest.fn()
    verifyEndpointResponse("Yeet", res, validEndpointObj, successCallback)
    expect(successCallback.mock.calls.length).toBe(0)
  })

  test("should throw error with invalid res argument", () => {
    const successCallback = jest.fn()
    expect(() => {
      verifyEndpointResponse(validResponse, {}, validEndpointObj, successCallback)
    }).toThrow(Error);
    expect(successCallback.mock.calls.length).toBe(0)
  })

  test("should throw error when given invalid endpoint paths/method object argument", () => {
    const invalidEndpointObj = {
      endpointPathKeys: ["NON_EXISTENT"],
      method: "GET"
    }

    const successCallback = jest.fn()
    expect(() => {
      verifyEndpointResponse("Yeet", res, invalidEndpointObj, successCallback)
    }).toThrow(Error);
    expect(successCallback.mock.calls.length).toBe(0)
  })
})

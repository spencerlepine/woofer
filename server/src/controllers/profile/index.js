const { DATA_KEYS } = require("../../../config/constants")
const verifyEndpointRequest = require("../../utils/verifyEndpointRequest")
const verifyEndpointResponse = require("../../utils/verifyEndpointResponse")
const fetchUserDocument = require("../controllerHelpers/user/fetchUserDocument")
const updateUserDocument = require("../controllerHelpers/user/updateUserDocument")
const deleteUserDocument = require("../controllerHelpers/user/deleteUserDocument")

const getUserProfile = require("./getUserProfile")
const updateUserProfile = require("./updateUserProfile")

const idKey = DATA_KEYS["USER_ID"]

module.exports = {
  getUserProfile: (req, res) => {
    const endpointObj = {
      endpointPathKeys: ["PROFILE"],
      method: "GET",
    }

    return getUserProfile(
      endpointObj,
      DATA_KEYS,
      verifyEndpointRequest,
      verifyEndpointResponse,
      fetchUserDocument
    )(req, res)
  },
  getFullUserProfile: (req, res) => {
    const endpointObj = {
      endpointPathKeys: ["PROFILE", "DETAILS"],
      method: "GET",
    }

    return getUserProfile(
      endpointObj,
      DATA_KEYS,
      verifyEndpointRequest,
      verifyEndpointResponse,
      fetchUserDocument,
      { allDetails: true }
    )(req, res)
  },
  updateUserProfile: (req, res) => {
    const endpointObj = {
      endpointPathKeys: ["PROFILE", "DETAILS"],
      method: "POST",
    }

    return updateUserProfile(
      endpointObj,
      DATA_KEYS,
      verifyEndpointRequest,
      verifyEndpointResponse,
      updateUserDocument
    )(req, res)
  },
  deleteUserProfile: (req, res) => {
    const query = { [idKey]: req.query[idKey] }
    const options = { justOne: true }
    const endpointObj = {
      endpointPathKeys: ["PROFILE", "DETAILS"],
      method: "DELETE",
    }

    verifyEndpointRequest(req, res, endpointObj, () => {
      deleteUserDocument(res, query, options).then((result) => {
        if (result) {
          res.status(201).json("Successfully deleted user record")
        } else {
          res.status(500).json("Unable to delete user record!")
        }
      })
    })
  },
}

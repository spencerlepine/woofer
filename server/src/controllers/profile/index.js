const { DATA_KEYS } = require('../../../config/constants')
const verifyEndpointRequest = require('../../utils/verifyEndpointRequest')
const verifyEndpointResponse = require('../../utils/verifyEndpointResponse')
const fetchUserDocument = require('../../utils/user/fetchUserDocument')
const updateUserDocument = require('../../utils/user/updateUserDocument')
const deleteUserDocument = require('../../utils/user/deleteUserDocument')

const getUserProfile = require('./getUserProfile')
const updateUserProfile = require('./getUserProfile')
const deleteUserProfile = require('./getUserProfile')

const idKey = DATA_KEYS["USER_ID"]

module.exports = {
  getUserProfile: () => {
    const endpointObj = {
      'endpointPathKeys': ['PROFILE'],
      'method': 'GET'
    }

    return getUserProfile(
      endpointObj,
      DATA_KEYS,
      verifyEndpointRequest,
      verifyEndpointResponse,
      fetchUserDocument
    )
  },
  getFullUserProfile: (req, res) => {
    const endpointObj = {
      'endpointPathKeys': ['PROFILE', 'DETAILS'],
      'method': 'GET'
    }

    return getUserProfile(
      endpointObj,
      DATA_KEYS,
      verifyEndpointRequest,
      verifyEndpointResponse,
      fetchUserDocument,
      { allDetails: true }
    )
  },
  updateUserProfile: (req, res) => {
    const endpointObj = {
      'endpointPathKeys': ['PROFILE', 'DETAILS'],
      'method': 'POST'
    }

    return updateUserProfile(
      endpointObj,
      DATA_KEYS,
      verifyEndpointRequest,
      verifyEndpointResponse,
      updateUserDocument,
    )
  },
  deleteUserProfile: (req, res) => {
    const query = { [idKey]: req.query[idKey] };
    const options = { justOne: true }
    const endpointObj = {
      'endpointPathKeys': ['PROFILE', 'DETAILS'],
      'method': 'DELETE'
    }

    verifyEndpointRequest(req, res, endpointObj, () => {
      deleteUserDocument(res, query, options)
        .then((result) => {
          if (result) {
            res.status(200).json('Successfully deleted user record')
          } else {
            res.status(500).json('Unable to delete user record!')
          }
        })
    })
  },
}
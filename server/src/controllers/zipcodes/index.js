const ZipcodePool = require('../../models/ZipcodePool')
const { DATA_KEYS } = require('../../../config/constants')
const verifyEndpointRequest = require('../../utils/verifyEndpointRequest')
const verifyEndpointResponse = require('../../utils/verifyEndpointResponse')
const updateUserDocument = require('../..//uitls/user/updateUserDocument')
const fetchUserDocument = require('../..//uitls/user/fetchUserDocument')
const addUserToZipcodePool = require('../..//uitls/zipcode/addUserToZipcodePool')
const removeUserFromZipcodePool = require('../../utils/zipcode/remveUserFromZipcodePool')
const handleErrorResponse = require('../../utils/handleErrorResponse')

const idKey = DATA_KEYS["USER_ID"]

const handleZipcodePoolUpdate = (req, res) => (endpointObj, filterZipcodes, addOrRemoveFunc) => {
  verifyEndpointRequest(req, res, endpointObj, () => {
    const userId = req.body[idKey]
    const thisZipcode = req.body[DATA_KEYS["ZIPCODE"]]

    // Add this zipcode to thisUser document under USER_ZIPCODES array
    addUserToZipcodePool(res, userId, thisZipcode)
      .then(() => {
        return fetchUserDocument(res, { [idKey]: req.query[idKey] })
      })
      .then((userProfile) => {
        const {
          [DATA_KEYS["USER_ZIPCODES"]]: userZipcodes,
        } = userProfile

        const updatedZips = filterZipcodes(userZipcodes, thisZipcode)

        const query = {
          [idKey]: userId
        };
        const update = {
          $set: {
            [DATA_KEYS["USER_ZIPCODES"]]: updatedZips
          }
        };
        const options = {};

        return updateUserDocument(res, query, update, options)
      })
      .then((updatedProfile) => {
        return addOrRemoveFunc(res, userId, thisZipcode)
          .then(() => updatedProfile)
      })
      .then((updatedProfile) => {
        const responseObj = {
          [DATA_KEYS["USER_PROFILE"]]: updatedProfile
        }
        verifyEndpointResponse(responseObj, res, endpointObj, () => {
          res.status(200).json(responseObj)
        })
      })
  })
}

module.exports = {
  addUserZipCode: (req, res) => {
    const endpointObj = {
      'endpointPathKeys': ['ZIPCODE', 'ADD'],
      'method': 'GET'
    }
    const filterZips = (userZipcodes, newZipcode) => {
      const extendedZipCodes = [...userZipcodes, newZipcode]
      return Array.from(new Set(extendedZipCodes))
    }

    handleZipcodePoolUpdate(res, req)(endpointObj, filterZips, addUserToZipcodePool)
  },
  removeUserZipCode: (req, res) => {
    const endpointObj = {
      'endpointPathKeys': ['ZIPCODE', 'REMOVE'],
      'method': 'DELETE'
    }
    const filterZips = (userZipcodes, zipToRemove) => {
      const oldZipCodes = [...userZipcodes]
      oldZipCodes.delete(zipToRemove)
      return Array.from(new Set(oldZipCodes))
    }

    handleZipcodePoolUpdate(res, req)(endpointObj, filterZips, removeUserFromZipcodePool)
  },
  fetchZipCodePool: (req, res) => {
    const endpointObj = {
      'endpointPathKeys': ['ZIPCODES', 'ALL'],
      'method': 'GET'
    }

    verifyEndpointRequest(req, res, endpointObj, () => {
      const zipcodeID = req.body[DATA_KEYS["ZIPCODE_ID"]]

      ZipcodePool.findOne({ [DATA_KEYS["ZIPCODE_ID"]]: zipcodeID })
        .then(
          (result) => {
            if (result) {
              res.status(201).json({
                // ...result,
                [DATA_KEYS["USER_ZIPCODES"]]: result
              })
            } else {
              res.status(409).json('Unable to update zipcode record!')
            }
          },
          err => handleErrorResponse(res, `Something went wrong: ${err}`, 500),
        );
    })
  },
}
const ZipcodePool = require("../../models/ZipcodePool")
const { DATA_KEYS } = require("../../../config/constants")
const verifyEndpointRequest = require("../../utils/verifyEndpointRequest")
const verifyEndpointResponse = require("../../utils/verifyEndpointResponse")
const updateUserDocument = require("../../utils/user/updateUserDocument")
const fetchUserDocument = require("../../utils/user/fetchUserDocument")
const addUserToZipcodePool = require("../../utils/zipcode/addUserToZipcodePool")
const removeUserFromZipcodePool = require("../../utils/zipcode/removeUserFromZipcodePool")
const handleErrorResponse = require("../../utils/handleErrorResponse")

const idKey = DATA_KEYS["USER_ID"]

const handleZipcodePoolUpdate =
  (req, res) => (endpointObj, filterZipcodes, addOrRemoveFunc) => {
    verifyEndpointRequest(req, res, endpointObj, () => {
      const userId = req.body[idKey]
      const thisZipcode = req.body[DATA_KEYS["ZIPCODE"]]

      // Add this zipcode to thisUser document under USER_ZIPCODES array
      addUserToZipcodePool(res, userId, thisZipcode)
        .then(() => {
          return fetchUserDocument(res, { [idKey]: userId })
        })
        .then((userProfile) => {
          if (userProfile) {
            const { [DATA_KEYS["USER_ZIPCODES"]]: userZipcodes } = userProfile

            const updatedZips = filterZipcodes(userZipcodes, thisZipcode)

            const query = {
              [idKey]: userId,
            }
            const update = {
              $set: {
                [DATA_KEYS["USER_ZIPCODES"]]: updatedZips,
              },
            }
            const options = {}

            return updateUserDocument(res, query, update, options)
          } else {
            handleErrorResponse(res, "Unable to find user profile", 409)
          }
        })
        .then((updatedProfile) => {
          return addOrRemoveFunc(res, userId, thisZipcode).then(() => updatedProfile)
        })
        .then((updatedProfile) => {
          const responseObj = {
            [DATA_KEYS["USER_PROFILE"]]: updatedProfile,
          }
          verifyEndpointResponse(responseObj, res, endpointObj, () => {
            res.status(200).json(responseObj)
          })
        })
        .catch((err) => handleErrorResponse(res, `Error adding user to zipcode => ${err}`, 500))
    })
  }

module.exports = {
  addUserZipCode: (req, res) => {
    const endpointObj = {
      endpointPathKeys: ["ZIPCODES", "ADD"],
      method: "POST",
    }

    const filterZips = (userZipcodes, newZipcode) => {
      const extendedZipCodes = [...userZipcodes, newZipcode]
      return Array.from(new Set(extendedZipCodes))
    }

    handleZipcodePoolUpdate(req, res)(endpointObj, filterZips, addUserToZipcodePool)
  },
  removeUserZipCode: (req, res) => {
    const endpointObj = {
      endpointPathKeys: ["ZIPCODE", "REMOVE"],
      method: "DELETE",
    }
    const filterZips = (userZipcodes, zipToRemove) => {
      const oldZipCodes = [...userZipcodes]
      oldZipCodes.delete(zipToRemove)
      return Array.from(new Set(oldZipCodes))
    }

    handleZipcodePoolUpdate(req, res)(
      endpointObj,
      filterZips,
      removeUserFromZipcodePool
    )
  },
  fetchZipCodePool: (req, res) => {
    const endpointObj = {
      endpointPathKeys: ["ZIPCODES", "ALL"],
      method: "GET",
    }

    verifyEndpointRequest(req, res, endpointObj, () => {
      const zipcodeID = req.body[DATA_KEYS["ZIPCODE_ID"]]

      ZipcodePool.findOne({ [DATA_KEYS["ZIPCODE_ID"]]: zipcodeID }).then(
        (result) => {
          if (result) {
            res.status(201).json({
              // ...result,
              [DATA_KEYS["USER_ZIPCODES"]]: result,
            })
          } else {
            res.status(409).json("Unable to update zipcode record!")
          }
        })
        .catch((err) => handleErrorResponse(res, "Error adding user to zipcode", 500))
    })
  },
}

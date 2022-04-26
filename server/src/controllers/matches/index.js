const { DATA_KEYS } = require("../../../config/constants")
const verifyEndpointRequest = require("../../utils/verifyEndpointRequest")
const verifyEndpointResponse = require("../../utils/verifyEndpointResponse")
const fetchUserDocument = require("../controllerHelpers/user/fetchUserDocument")
const handleErrorResponse = require("../../utils/handleErrorResponse")

const randomUserFromZipPool = require("./randomUserFromZipPool")

const documentUserSwipeAccept = require("./documentUserSwipeAccept")
const documentUserSwipeReject = require("./documentUserSwipeReject")

const idKey = DATA_KEYS["USER_ID"]

module.exports = {
  fetchPossibleMatch: (req, res) => {
    const endpointObj = {
      endpointPathKeys: ["MATCHES", "GENERATE"],
      method: "GET",
    }

    verifyEndpointRequest(req, res, endpointObj, () => {
      const userId = req.query[DATA_KEYS["USER_ID"]] + ""
      const query = { [idKey]: userId }

      return randomUserFromZipPool(res, userId).then((responseObj) => {
        // Return a null user! Will not always find one
        res.status(200).json(responseObj)

        // Verify function will demand a FULL user profile with key/value pairs
        // verifyEndpointResponse(responseObj, res, endpointObj, () => {

        // })
      })
    })
  },
  saveUserSwipeChoice: (req, res) => {
    const endpointObj = {
      endpointPathKeys: ["MATCHES", "SWIPE"],
      method: "POST",
    }

    verifyEndpointRequest(req, res, endpointObj, () => {
      const {
        [DATA_KEYS["THIS_USER_ID"]]: thisUserID,
        [DATA_KEYS["THAT_USER_ID"]]: thatUserID,
        [DATA_KEYS["MATCH_STATUS"]]: matchStatus,
      } = req.body

      if (matchStatus === "accept") {
        documentUserSwipeAccept(res, endpointObj, thisUserID, thatUserID)
      } else if (matchStatus === "reject") {
        documentUserSwipeReject(res, endpointObj, thisUserID, thatUserID)
      }
    })
  },
}

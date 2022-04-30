// const { DATA_KEYS } = require("../../../config/constants")
// // const verifyEndpointRequest = require("../../utils/verifyEndpointRequest")
// // const verifyEndpointResponse = require("../../utils/verifyEndpointResponse")
// // const fetchUserDocument = require("../controllerHelpers/user/fetchUserDocument")
// // const fetchMatchRecord = require("../controllerHelpers/matches/fetchMatchRecord")
// // const fetchUserMatchQueue = require("../controllerHelpers/matches/fetchUserMatchQueue")
// // const handleErrorResponse = require("../../utils/handleErrorResponse")

// // const randomUserFromZipPool = require("./randomUserFromZipPool")

// // const documentUserSwipeAccept = require("./documentUserSwipeAccept")
// // const documentUserSwipeReject = require("./documentUserSwipeReject")

// // const idKey = DATA_KEYS["USER_ID"]
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
}

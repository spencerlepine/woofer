const { DATA_KEYS } = require("../../../config/constants")
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
  saveUserSwipeChoice: (req, res) => {
    const endpointObj = {
      endpointPathKeys: ["MATCHES", "SWIPE"],
      method: "POST",
    }

    try {
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
    } catch (err) {
      console.error(err)
    }
  },
}

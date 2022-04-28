const { DATA_KEYS } = require("../../../config/constants")
const verifyEndpointRequest = require("../../utils/verifyEndpointRequest")
const verifyEndpointResponse = require("../../utils/verifyEndpointResponse")
const fetchUserDocument = require("../controllerHelpers/user/fetchUserDocument")
const fetchMatchRecord = require("../controllerHelpers/matches/fetchMatchRecord")
const fetchUserMatchQueue = require("../controllerHelpers/matches/fetchUserMatchQueue")
const handleErrorResponse = require("../../utils/handleErrorResponse")

const randomUserFromZipPool = require("./randomUserFromZipPool")

const documentUserSwipeAccept = require("./documentUserSwipeAccept")
const documentUserSwipeReject = require("./documentUserSwipeReject")

const idKey = DATA_KEYS["USER_ID"]

module.exports = {
  fetchMatchStatus: (req, res) => {
    // const endpointObj = {
    //   endpointPathKeys: ["MATCHES", "STATUS"],
    //   method: "GET",
    // }

    const {
      [DATA_KEYS["THIS_USER_ID"]]: thisUserId,
      [DATA_KEYS["THAT_USER_ID"]]: thatUserId,
    } = req.query

    const fetchRecords = Promise.all([
      fetchMatchRecord(res, { [DATA_KEYS["USER_ID"]]: thisUserId }),
      fetchMatchRecord(res, { [DATA_KEYS["USER_ID"]]: thatUserId }),
    ])

    fetchRecords
      .then(([userMatchRecordsA, userMatchRecordsB]) => {
        const recordsKey = DATA_KEYS["USER_MATCHES"]
        // Extract userA matches key value pair
        let userAChoice = "none"
        if (userMatchRecordsA && userMatchRecordsA[recordsKey]) {
          const { [recordsKey]: userMatchRecords } = userMatchRecordsA
          userAChoice = userMatchRecords[thatUserId]
        }

        // Extract userB matches key value pair
        let userBChoice = "none"
        if (userMatchRecordsB && userMatchRecordsB[recordsKey]) {
          const { [recordsKey]: userMatchRecords } = userMatchRecordsB
          userBChoice = userMatchRecords[thatUserId]
        }

        // Format response obj with idKey "none" or status
        const responseObj = {
          [thisUserId]: userAChoice,
          [thatUserId]: userBChoice,
        }
        res.status(200).json(responseObj)
      })
      .catch((err) =>
        res.status(500).json({
          message: "Unable to fetch match status!",
          error: JSON.stringify(err),
        })
      )
  },
  fetchMatchQueue: (req, res) => {
    // const endpointObj = {
    //   endpointPathKeys: ["MATCHES", "QUEUE"],
    //   method: "GET",
    // }

    const { [DATA_KEYS["USER_ID"]]: userId } = req.query

    fetchUserMatchQueue(res, thisUserId)
      .then((matchRecord) => {
        const responseObj = {
          [DATA_KEYS["USER_QUEUE"]]: matchRecord,
        }
        res.status(200).json(responseObj)
      })
      .catch((err) =>
        res.status(500).json({
          message: "Unable to fetch user match queue!",
          error: JSON.stringify(err),
        })
      )
  },
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

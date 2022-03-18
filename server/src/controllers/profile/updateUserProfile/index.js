const verifyEndpointRequest = require("../../../utils/verifyEndpointRequest")
const verifyEndpointResponse = require("../../../utils/verifyEndpointResponse")

module.exports =
  (endpointObj, DATA_KEYS, verifyReq, verifyRes, updateUserRecord) => (req, res) => {
    const idKey = [DATA_KEYS["USER_ID"]]
    const query = { [idKey]: req.body[idKey] }

    verifyEndpointRequest(req, res, endpointObj, () => {
      // DON'T change the user's ID
      const tempId = req.body[idKey]
      if (req.body[DATA_KEYS["USER_ID"]]) {
        delete req.body[DATA_KEYS["USER_ID"]]
      }

      const update = {
        $set: req.body,
      }
      const options = {}

      updateUserRecord(res, query, update, options)
        .then((updatedRecord) => {
          const profile = Object.assign(updatedRecord._doc)

          const responseObj = {
            [DATA_KEYS["USER_PROFILE"]]: {
              [DATA_KEYS["USER_ID"]]: tempId,
              ...profile,
            },
          }

          verifyEndpointResponse(responseObj, res, endpointObj, () => {
            res.status(201).json(responseObj)
          })
        })
    })
  }

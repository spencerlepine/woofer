const filterProfileKeys = (userProfileObj, DATA_KEYS) => {
  const u = userProfileObj
  return {
    [DATA_KEYS["USER_ID"]]: u[DATA_KEYS["USER_ID"]],
    [DATA_KEYS["USER_NAME"]]: u[DATA_KEYS["USER_NAME"]],
    [DATA_KEYS["USER_FIRST_NAME"]]: u[DATA_KEYS["USER_FIRST_NAME"]],
    [DATA_KEYS["USER_LAST_NAME"]]: u[DATA_KEYS["USER_LAST_NAME"]],
    [DATA_KEYS["USER_ZODIAC"]]: u[DATA_KEYS["USER_ZODIAC"]],
    [DATA_KEYS["USER_GENDER"]]: u[DATA_KEYS["USER_GENDER"]],
    [DATA_KEYS["USER_BREED"]]: u[DATA_KEYS["USER_BREED"]],
    [DATA_KEYS["USER_BIO"]]: u[DATA_KEYS["USER_BIO"]],
    [DATA_KEYS["USER_BIRTHDAY"]]: u[DATA_KEYS["USER_BIRTHDAY"]],
    [DATA_KEYS["USER_PROFILE_PIC"]]: u[DATA_KEYS["USER_PROFILE_PIC"]],
  }
}

module.exports =
  (endpointObj, DATA_KEYS, verifyReq, verifyRes, fetchUserDoc, options = {}) =>
  (req, res) => {
    const { allDetails } = options
    const idKey = DATA_KEYS["USER_ID"]
    const query = { [idKey]: req.query[idKey] || req.body[idKey] }

    verifyReq(req, res, endpointObj, () => {
      fetchUserDoc(res, query).then((userProfile) => {
        let filteredProfile = userProfile || {}
        if (!allDetails) {
          filteredProfile = filterProfileKeys(userProfile, DATA_KEYS)
        }
        const responseObj = {
          [DATA_KEYS["USER_PROFILE"]]: filteredProfile,
        }
        verifyRes(responseObj, res, endpointObj, () => {
          res.status(200).json(responseObj)
        })
      })
    })
  }

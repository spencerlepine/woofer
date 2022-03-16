module.exports = (ZipcodePool, DATA_KEYS, zipcodeID, userID, res, FINAL_RESPONSE, logger) => {
  ZipcodePool.findOne({ [DATA_KEYS["ZIPCODE_ID"]]: zipcodeID })
    .then(
      (result) => {
        let poolUsersObj = {};

        if (result) {
          poolUsersObj = result[DATA_KEYS["POOL_USERS"]]
        }

        poolUsersObj[userID] = 1

        const query = { [DATA_KEYS["ZIPCODE_ID"]]: zipcodeID }
        const update = {
          $set: {
            [DATA_KEYS["POOL_USERS"]]: poolUsersObj
          }
        };
        const options = { upsert: true, multi: true };

        ZipcodePool.updateOne(query, update, options)
          .then(
            (result) => {
              if (result) {
                res.status(201).json(FINAL_RESPONSE)
              } else {
                res.status(409).json('Unable to update zipcode record!')
              }
            },
            err => logger.error(`Something went wrong: ${err}`),
          );
      },
      err => logger.error(`Something went wrong: ${err}`),
    );
}
const ZipcodePool = require('../../models/ZipcodePool');
const DogUser = require('../../models/DogUser');
const { DATA_KEYS } = require('../../../config/constants')
const verifyEndpointRequest = require('../../utils/verifyEndpointRequest')
const verifyEndpointResponse = require('../../utils/verifyEndpointResponse')

const logger = require('../../../config/logger')

const saveUserToZipcodePool = require('./saveUserToZipcodePool')

const id = DATA_KEYS["USER_ID"];
const zipcode = DATA_KEYS["ZIPCODE"];

module.exports = {
  addUserZipCode: (req, res) => {

    // find zipcode_id DOC
    // add KEY for this userId: 1 if UNDEFINED

    const validRequestCheck = verifyEndpointRequest(req, ['ZIPCODES', 'ADD'], 'POST');

    if (validRequestCheck === true) {
      const userID = req.body[id];
      const zipcodeID = req.body[zipcode]

      DogUser.findOne({ [id]: userID })
        .then(
          (result) => {
            if (result) {
              const userZipcodes = [...result[DATA_KEYS["USER_ZIPCODES"]], zipcodeID]
              const extendedZips = Array.from(new Set(userZipcodes))

              const query = {
                [id]: userID
              };
              const update = {
                $set: {
                  [DATA_KEYS["USER_ZIPCODES"]]: extendedZips
                }
              };
              const options = {};

              DogUser.updateOne(query, update, options)
                .then(
                  (result) => {
                    if (result) {
                      const FINAL_RESPONSE = {
                        [DATA_KEYS["USER_ZIPCODES"]]: extendedZips
                      }
                      saveUserToZipcodePool(ZipcodePool, DATA_KEYS, zipcodeID, userID, res, FINAL_RESPONSE, logger)
                    } else {
                      res.status(409).json('Unable to update user zipcodes!')
                    }
                  },
                  err => logger.error(`Something went wrong: ${err}`),
                );
            } else {
              res.status(409).json('Unable to find user record!')
            }
          },
          err => logger.error(`Something went wrong: ${err}`),
        );
    } else {
      logger.error(validRequestCheck)
      res.status(400).json(validRequestCheck)
    }
  },
  removeUserZipCode: (req, res) => {
    // TODO
    res.status(200).json('The API endpoint worked!')
  },
  fetchZipCodePool: (req, res) => {
    const validRequestCheck = verifyEndpointRequest(req, ['ZIPCODES', 'ALL'], 'GET');

    if (validRequestCheck === true) {
      const zipcodeID = req.body[zipcode]

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
          err => logger.error(`Something went wrong: ${err}`),
        );
    } else {
      logger.error(validRequestCheck)
      res.status(400).json(validRequestCheck)
    }
  },
}

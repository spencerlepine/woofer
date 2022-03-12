const Joi = require('Joi');

const {
  DATABASE_SCHEMA,
  DATA_KEYS,
  ENDPOINT_ROUTES,
  BODY_KEYS,
  OPT_KEYS,
  PARAM_KEYS,
  RESPONSE_KEYS,
  expectedRequest,
  endpointURLStr,
  baseURL,
} = require('../../constants');

const dbSchema = DATABASE_SCHEMA(Joi);

module.exports = {
  DATABASE_SCHEMA: dbSchema,
  DATA_KEYS: DATA_KEYS,
  ENDPOINT_ROUTES: ENDPOINT_ROUTES,
  BODY_KEYS: BODY_KEYS,
  OPT_KEYS: OPT_KEYS,
  PARAM_KEYS: PARAM_KEYS,
  RESPONSE_KEYS: RESPONSE_KEYS,
  expectedRequest: expectedRequest,
  endpointURLStr: endpointURLStr,
  baseURL: baseURL,
}
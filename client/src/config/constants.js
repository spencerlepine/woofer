import Joi from "joi"

import { DATABASE_SCHEMA, DATA_KEYS, ENDPOINT_ROUTES } from "../../constants"

const {
  ENDPOINT_ROUTES: endpointRoutes,
  BODY_KEYS,
  OPT_KEYS,
  PARAM_KEYS,
  RESPONSE_KEYS,
  expectedRequest,
  endpointURLStr,
  baseURL,
} = ENDPOINT_ROUTES

const dbSchema = DATABASE_SCHEMA(Joi)

const exportObj = {
  DATABASE_SCHEMA: dbSchema,
  DATA_KEYS: DATA_KEYS,
  ENDPOINT_ROUTES: endpointRoutes,
  BODY_KEYS: BODY_KEYS,
  OPT_KEYS: OPT_KEYS,
  PARAM_KEYS: PARAM_KEYS,
  RESPONSE_KEYS: RESPONSE_KEYS,
  expectedRequest: expectedRequest,
  endpointURLStr: endpointURLStr,
  baseURL: baseURL,
}

export default exportObj

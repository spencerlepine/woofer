const Joi = require('Joi');

const schema = require('../../constants');
const {
  DATABASE_SCHEMA,
  DATA_KEYS,
  ENDPOINT_ROUTES,
} = require('../../constants');
const dbSchema = databaseSchema(Joi);

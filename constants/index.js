module.exports = {
  DATABASE_SCHEMA: require('./databaseSchema'),
  DATA_KEYS: require('./dataKeys'),
  ENDPOINT_ROUTES: require('./endpointRoutes'),
  BODY_KEYS: require('./endpointRoutes').BODY_KEYS,
  OPT_KEYS: require('./endpointRoutes').OPT_KEYS,
  PARAM_KEYS: require('./endpointRoutes').PARAM_KEYS,
  RESPONSE_KEYS: require('./endpointRoutes').RESPONSE_KEYS,
  expectedRequest: require('./endpointRoutes').expectedRequest,
  endpointURLStr: require('./endpointRoutes').endpointURLStr,
}
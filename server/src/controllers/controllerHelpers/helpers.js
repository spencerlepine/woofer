const verifyEndpointResponse = require('')
const verifyEndpointRequest = require('')
const verifyKeyDataType = require('')
const CONSTANTS = require('../../../config/constants')

const controllerHelpers = {
  ...CONSTANTS,
  handleErrorResponse: require('../../utils/handleErrorResponse'),
  verifyEndpointResponse: verifyEndpointResponse,
  verifyEndpointRequest: verifyEndpointRequest,
  verifyKeyDataType: verifyKeyDataType,
  models: require('../../models')
}

module.exports = controllerHelpers
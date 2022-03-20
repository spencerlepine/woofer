const verifyEndpointResponse = require("../../utils/verifyEndpointResponse")
const verifyEndpointRequest = require("../../utils/verifyEndpointRequest")
const verifyKeyDataType = require("../../utils/verifyKeyDataType")
const CONSTANTS = require("../../../config/constants")

const controllerHelpers = {
  ...CONSTANTS,
  handleErrorResponse: require("../../utils/handleErrorResponse"),
  verifyEndpointResponse: verifyEndpointResponse,
  verifyEndpointRequest: verifyEndpointRequest,
  verifyKeyDataType: verifyKeyDataType,
  models: require("../../models"),
}

module.exports = controllerHelpers

const constants = require("../../config/constants")

const { mockUser, mockUserB, signupMockUser } = require("./mockUsers")(
  constants.DATA_KEYS
)

exports.app = require("../../src/app")
exports.constants = constants
exports.verifyEndpointResponse = require("../../src/utils/verifyEndpointResponse")
exports.mockUser = mockUser
exports.mockUserB = mockUserB
exports.signupMockUser = signupMockUser

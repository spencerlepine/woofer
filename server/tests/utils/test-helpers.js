const constants = require("../../config/constants")

const { mockUser, mockUserB, signupMockUser } = require("./mockUsers")(
  constants.DATA_KEYS
)

const mockRes = {
  status: jest.fn(() => mockRes),
  json: jest.fn(),
  setHeader: jest.fn(),
  end: jest.fn((r) => r),
}
exports.app = require("../../src/app")
exports.constants = constants
exports.verifyEndpointResponse = require("../../src/utils/verifyEndpointResponse")
exports.mockUser = mockUser
exports.mockUserB = mockUserB
exports.signupMockUser = signupMockUser
exports.mockRes = mockRes

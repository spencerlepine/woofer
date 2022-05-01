const config = require("../../config/config")

const {
  mockUser,
  mockUserB,
  signupMockUser,
  addUserToZip,
  swipeOnUser,
} = require("./mockUsers")

const modelHelpers = require("../../src/models/modelHelpers")

const mockRes = {
  status: jest.fn(() => mockRes),
  json: jest.fn(),
  setHeader: jest.fn(),
  end: jest.fn((r) => r),
}
exports.app = require("../../src/app")
exports.mockUser = mockUser
exports.mockUserB = mockUserB
exports.addUserToZip = addUserToZip
exports.signupMockUser = signupMockUser
exports.swipeOnUser = swipeOnUser
exports.mockRes = mockRes
exports.modelHelpers = modelHelpers
exports.SERVER_URL = config.SERVER_URL

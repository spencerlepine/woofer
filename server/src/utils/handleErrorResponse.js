const logger = require("../../config/logger")

const handleErrorResponse = (res, err, code = 400) => {
  logger.error(err)
  res.setHeader("Content-Type", /json/)
  res.status(code).end(err)
}

module.exports = handleErrorResponse

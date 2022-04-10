const logger = require("../../config/logger")

const handleErrorResponse = (res, err, code = 400) => {
  logger.error(err)
  if (res.setHeader) {
    res.setHeader("Content-Type", /json/)
  }
  if (typeof res.status === "function") {
    res.status(code)
  }
  if (typeof res.end === "function") {
    res.end(err)
  }
}

module.exports = handleErrorResponse

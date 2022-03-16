const logger = require('../../config/logger')

const handleErrorResponse = (res, err, code = 400) => {
    logger.error(err)
    res.status(code).json(err)
}

module.exports = handleErrorResponse
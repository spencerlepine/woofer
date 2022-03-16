const { DATABASE_SCHEMA: schema } = require("../../config/constants")

const verifyKeyDataType = (key, value) => {
  const { error } = schema.validate({ [key]: value })

  if (error) {
    console.log(error)
    return false
  }
  return true
}

module.exports = verifyKeyDataType

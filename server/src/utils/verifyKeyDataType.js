const {
  DATABASE_SCHEMA: schema,
} = require('../../config/constants')

const verifyKeyDataType = (key) => {
  const { error } = schema.validate({ [key]: key });

  if (error) {
    console.log(error);
    return false
  }
  return true
}

module.exports = verifyKeyDataType;
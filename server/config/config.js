/*
 * Use "joi" library to verify
 * enviroment variables exists
 * and match expected value/type
 */

const dotenv = require("dotenv")
const path = require("path")
const Joi = require("joi")

dotenv.config({ path: path.join(__dirname, "../../.env") })

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .default("production"),
    PORT: Joi.string().required().description("Entry port the express server"),
    MONGODB_URL: Joi.string().required().description("Mongo DB url"),
    LOCAL_MONGODB_URL: Joi.string().required().description("Mongo DB url"),
  })
  .unknown()

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
  ...envVars,
  MONGOOSE: {
    testUrl: envVars.LOCAL_MONGODB_URL,
    url: envVars.MONGODB_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
}

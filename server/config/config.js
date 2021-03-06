/*
 * Use "joi" library to verify
 * enviroment variables exists
 * and match expected value/type
 */

const path = require("path")
const Joi = require("joi")

if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv")
  dotenv.config({ path: path.join(__dirname, "../../.env") })
}

const mongoURL = process.env.MONGODB_URL

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 5000,
  MONGOOSE: {
    url: mongoURL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  // SERVER_URL: `http://localhost:${envVars.PORT}`,
  SERVER_URL: "http://localhost",
}

// const envVarsSchema = Joi.object()
//   .keys({
//     NODE_ENV: Joi.string()
//       .valid("production", "development", "test")
//       .default("production"),
//     PORT: Joi.string().required().description("Entry port the express server"),
//     MONGODB_URL: Joi.string().required().description("Mongo DB url"),
//   })
//   .unknown()

// const { value: envVars, error } = envVarsSchema
//   .prefs({ errors: { label: "key" } })
//   .validate(process.env)

// if (error) {
//   throw new Error(`Config validation error: ${error.message}`)
// }

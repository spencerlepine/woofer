/*
 * Use "joi" library to verify
 * enviroment variables exists
 * and match expected value/type
 */

import dotenv from "dotenv"
import path from "path"
import Joi from "joi"
const nodeEnv = process.env.NODE_ENV || "development"
dotenv.config({ path: path.join(__dirname, `../../../.env.${nodeEnv}`) })

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .default("production"),
    SERVER_URL: Joi.string().default("http://localhost:3000"),
  })
  .unknown()

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export default envVars

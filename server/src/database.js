// https://medium.com/weekly-webtips/express-js-testing-mocking-mongodb-46c3797a201
const mongoose = require("mongoose")
const config = require("../config/config")
const logger = require("../config/logger")
const MONGO_CONFIG = config.MONGOOSE

let mongod = null
let isConnected = false

const connectDB = async () => {
  try {
    let dbUrl = MONGO_CONFIG.url
    if (config.NODE_ENV === "test") {
      const { MongoMemoryServer } = require("mongodb-memory-server-core")
      mongod = await MongoMemoryServer.create()
      dbUrl = mongod.getUri()
    }

    let conn = {
      close: () => {},
      connection: {},
    }
    if (dbUrl) {
      conn = await mongoose.connect(dbUrl, MONGO_CONFIG.options)

      isConnected = true

      if (process.env.NODE_ENV !== "test") {
        logger.info(`MongoDB connected: ${conn.connection.host}`)
      }
    }
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

const disconnectDB = async () => {
  try {
    await mongoose.connection.close()
    if (mongod) {
      await mongod.stop()
    }
  } catch (err) {
    logger.error(err)
    process.exit(1)
  }
}

module.exports = {
  isConnected: () => isConnected,
  connectDB,
  disconnectDB,
  connection: mongoose.connection,
}

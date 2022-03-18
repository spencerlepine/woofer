const mongoose = require("mongoose")
const app = require("./app")
const config = require("../config/config")
const logger = require("../config/logger")
const { connectDB, disconnectDB = require('./database')
const PORT = config.PORT

connectDb()

let server
if (config.NODE_ENV !== "test") {
  server = app.listen(PORT, () => {
    logger.info(`Listening to port ${PORT}`)
  })
}

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed")
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error) => {
  logger.error(error)
  exitHandler()
}

process.on("uncaughtException", unexpectedErrorHandler)
process.on("unhandledRejection", unexpectedErrorHandler)

process.on("SIGTERM", () => {
  logger.info("SIGTERM received")
  if (server) {
    server.close()
  }
})

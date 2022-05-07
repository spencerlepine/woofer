const mongoose = require("mongoose")
const socket = require("socket.io")
const app = require("./app")
const config = require("../config/config")
const logger = require("../config/logger")
const { connectDB, disconnectDB } = require("./database")
const PORT = process.env.PORT || config.PORT

connectDB()

let server
if (config.NODE_ENV !== "test") {
  server = app.listen(PORT, () => {
    logger.info(`Listening to port ${PORT}`)
  })

  // Socket IO configuration
  const io = socket(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
      transports: ["websocket", "polling"],
      credentials: true,
    },
    allowEIO3: true,
  })

  const chat = require("./chat")
  chat(io)
}

const exitHandler = () => {
  if (server) {
    server.close(() => {
      disconnectDB()
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
    disconnectDB()
    server.close()
  }
})

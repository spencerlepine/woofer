const uuidv4 = require("uuid").v4
// const { MongoClient } = require("mongodb");
// const { createAdapter } = require("@socket.io/mongo-adapter");
// const config = require("../config/config")
const logger = require("../config/logger")
// const MONGO_CONFIG = config.MONGOOSE

// const mongoClient = new MongoClient(MONGO_CONFIG.url, MONGO_CONFIG.options);

/******** */
const messages = new Set()
const users = new Map()

const messageExpirationTimeMS = 5 * 60 * 1000

class Connection {
  constructor(io, socket, user) {
    this.socket = socket
    this.defaultUser = user
    this.io = io

    socket.on("getMessages", () => this.getMessages())
    socket.on("message", (value) => this.handleMessage(value))
    socket.on("disconnect", () => this.disconnect())
    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`)
    })
  }

  sendMessage(message) {
    this.io.sockets.emit("message", message)
  }

  getMessages() {
    messages.forEach((message) => this.sendMessage(message))
  }

  handleMessage(value) {
    const message = {
      id: uuidv4(),
      user: this.defaultUser,
      value,
      time: Date.now(),
    }

    console.log(message)

    messages.add(message)
    this.sendMessage(message)

    setTimeout(() => {
      messages.delete(message)
      this.io.sockets.emit("deleteMessage", message.id)
    }, messageExpirationTimeMS)
  }

  disconnect() {
    users.delete(this.socket)
  }
}

const getUserFromSocket = (socket) => {
  try {
    const id = socket.handshake.query.userId
    const name = socket.handshake.query.userName

    return {
      id,
      name,
    }
  } catch (e) {
    return "anonymous"
  }
}

const chat = async (io) => {
  io.sockets.on("connection", function (socket) {
    logger.info("Connected to Socket.io!")

    socket.on("create", function (roomId) {
      logger.info(`Joined room: ${roomId}`)
      socket.join(roomId)
      new Connection(io, socket, getUserFromSocket(socket))
    })
  })
}

module.exports = chat

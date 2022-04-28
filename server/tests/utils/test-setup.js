const mongoose = require("mongoose")
const app = require("../../src/app")
const { connectDB, disconnectDB, connection: db } = require("../../src/database")
const config = require("../../config/config")

global.testHelpers = require("./test-helpers")

beforeAll(async () => {
  await connectDB()
})

afterEach(async () => {
  await Promise.all(
    Object.values(db.collections).map((collection) => collection.deleteMany({}))
  )
  setTimeout(() => {}, 200)
})

afterAll(async () => {
  if (app.close) {
    app.close((err) => {
      process.exit(err ? 1 : 0)
    })
    await disconnectDB()
  }
})

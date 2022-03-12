const mongoose = require("mongoose")
const config = require("../../config/config")

const MONGO_CONFIG = config.MONGOOSE

const setupTestDB = () => {
  beforeAll(async () => {
    await mongoose.connect(MONGO_CONFIG.testUrl, MONGO_CONFIG.options)
  })

  beforeEach(async () => {
    await Promise.all(
      Object.values(mongoose.connection.collections).map(async (collection) =>
        collection.deleteMany()
      )
    )
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })
}

setupTestDB()

module.exports = setupTestDB

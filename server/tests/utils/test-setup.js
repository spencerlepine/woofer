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
})

afterAll(async () => {
  if (app.close) {
    app.close((err) => {
      process.exit(err ? 1 : 0)
    })
    await disconnectDB()
  }
})

// const MONGO_CONFIG = config.MONGOOSE

// afterAll(async () => {
//   await new Promise(resolve => setTimeout(() => resolve(), 10000)); // avoid jest open handle error
// });

// beforeAll(async () => {
//   await mongoose.connect(`${MONGO_CONFIG.testUrl}`, MONGO_CONFIG.options, ((err) => { if (err) throw err; }))
// })

// beforeEach(async () => {
//   const randomDb = `${MONGO_CONFIG.testUrl}_${(Math.round(Math.random() * 10000))}`
//   await mongoose.connect(randomDb, MONGO_CONFIG.options, ((err) => { if (err) throw err; }))
// })

// beforeEach((done) => {
//   Promise.all(
//     Object.values(mongoose.connection.collections).map((collection) =>
//       collection.deleteMany
//     )
//   ).then(done)
// })

// afterAll(async () => {
//   await mongoose.disconnect()
// })

const mongoose = require("mongoose")
const app = require("../../src/app")
const { connectDB, disconnectDB, connection: db } = require("../../src/database")
const config = require("../../config/config")
const models = require("../../src/models")

global.testHelpers = require("./test-helpers")

beforeAll(async () => {
  await connectDB()
})

afterEach(async () => {
  await Promise.all(
    Object.values(models).map(
      (Model) => () => Model.deleteMany({}, (err) => console.log(err))
    )
  )
})

// afterEach(async () => {
//   await Promise.all(
//     Object.values(models).map((Model) => (
//       Model.deleteMany({}, (err) => console.log(err))
//     ))
//   )
// })

afterAll(async () => {
  if (app.close) {
    app.close((err) => {
      process.exit(err ? 1 : 0)
    })
    await disconnectDB()
  }
})

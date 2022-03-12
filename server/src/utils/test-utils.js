const mongoose = require("mongoose")
const app = require("../app")

afterAll(() => {
  if (app.close) {
    app.close((err) => {
      process.exit(err ? 1 : 0)
    })
  }
})

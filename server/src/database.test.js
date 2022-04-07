const { connection, disconnectDB } = require("./database")

describe("Database connection", () => {
  test("should be connected to a databse", (done) => {
    expect(connection).toBeTruthy()
    expect(connection.host).toBeTruthy()
    done()
  })
})

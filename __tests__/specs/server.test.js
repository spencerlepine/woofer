const axios = require("axios")
const path = require("path")
const dotenv = require("dotenv").config({ path: path.join(__dirname, "../../.env") })

describe("Server Connection", () => {
  const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000"

  it("Connects to localhost on PORT 5000", (done) => {
    axios
      .get(SERVER_URL + "/api/status")
      .then((response) => {
        expect(response).toBeDefined()
        expect(response).toHaveProperty("data")
        const { data } = response
        expect(data).toHaveProperty("status", "running")
        done()
      })
      .catch(done)
  })
})

const axios = require("axios")
const path = require("path")

describe("Client Connection", () => {
  const CLIENT_URL = "http://localhost:3000"

  it("Connects to localhost on PORT 3000", (done) => {
    axios
      .get(CLIENT_URL)
      .then((response) => {
        expect(response).toBeDefined()
        expect(response).toHaveProperty("status", 200)
        done()
      })
      .catch(done)
  })
})

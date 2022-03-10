const config = require("../config/config")
const app = require("./app")

const PORT = config.SERVER_PORT || 8000

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

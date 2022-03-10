const config = require("../config/config")
const app = require("./app")

const PORT = config.PORT

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

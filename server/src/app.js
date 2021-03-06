const express = require("express")
const path = require("path")
const helmet = require("helmet")
const xss = require("xss-clean")
const mongoSanitize = require("express-mongo-sanitize")
const compression = require("compression")
const cors = require("cors")

const httpStatus = require("http-status")
const config = require("../config/config")
const morgan = require("../config/morgan")

const { authLimiter } = require("./middlewares/rateLimiter")
const routes = require("./routes")
const { errorConverter, errorHandler } = require("./middlewares/error")
const ApiError = require("./utils/ApiError")

const app = express()

if (config.env !== "test") {
  app.use(morgan.successHandler)
  app.use(morgan.errorHandler)
}

// set security HTTP headers
app.use(helmet())

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// sanitize request data
app.use(xss())
app.use(mongoSanitize())

// gzip compression
app.use(compression())

// const corsOptions = {
//   origin: [
//     "*",
//     // "http://ec2-34-203-190-56.compute-1.amazonaws.com",
//     // "http://34.203.190.56",
//     // "http://localhost:3000",
//   ],
//   optionsSuccessStatus: 200,
// }
// app.use(cors(corsOptions))

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  )
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS")

  if (req.method == "OPTIONS") {
    res.send(200)
  } else {
    next()
  }
})

app.use(authLimiter)

// const CLIENT_FRONTEND = express.static("client/build")
// app.use(CLIENT_FRONTEND)
// app.use("/static", express.static(path.join(__dirname, "../../client/public")))

// Return index.html for React Router
// AVOID triggering for /api GET requests
// app.get(/^(?!\/api*)/, function (req, res) {
//   res.sendFile("index.html", { root: path.join(__dirname, "../../client/build/") })
// })

// v1 api routes
app.use("/api", routes)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Endpoint not found"))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

module.exports = app

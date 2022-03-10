const express = require("express")
const path = require("path")
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const cors = require('cors');
// const routes = require('./routes');

const app = express()

// app.use(cors());
// app.use(morgan('dev'));
// app.use(bodyParser.json());

// Apply middleware
const CLIENT_FRONTEND = express.static(path.join(__dirname, "..", "client", "build"))
app.use(CLIENT_FRONTEND)
app.use(express.json())

module.exports = app

var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet')
const cors = require('cors')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Add some security headers
app.use(helmet())
// Add cors header
app.use(cors())

const auth = require('./routes/unauthenticatedRoutes/auth')
app.use('/auth', auth)

module.exports = app;

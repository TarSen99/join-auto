var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Mongoose = require('mongoose')
const config = require('./config.js')
const formidableMiddleware = require('express-formidable');
var cors = require('cors')

Mongoose.connect(config.BD_BASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
  console.log('connected success')
  })
  .catch(err => {
    console.log('connection error')
    console.log(err)
})

var app = express();

app.use(cors())
app.options('*', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', '*');
  res.header("Access-Control-Allow-Headers", "*");
  res.end();
});

app.all('*', function (req, res, next) {
  var origin = req.get('origin');
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

var indexRouter = require('./routes/index');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(formidableMiddleware({
  encoding: 'utf-8',
  multiples: true, // req.files to be arrays of files
}));
app.use('/', indexRouter);

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  console.log(err.stack)

  return res.status(err.status || 500).json({
    stack: err.stack,
    message: err.message
  });
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Mongoose = require('mongoose')
const config = require('./config.js')

Mongoose.connect(config.BD_BASE_URL, { useNewUrlParser: true, useUnifiedTopology: true})

var indexRouter = require('./routes/index');
var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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

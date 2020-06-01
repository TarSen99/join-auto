var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Mongoose = require('mongoose')
const config = require('./config.js')
const formidableMiddleware = require('express-formidable');

Mongoose.connect(config.BD_BASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
  console.log('connected success')
  })
  .catch(err => {
    console.log('connection error')
    console.log(err)
})

var app = express();

app.options('*', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', '*');
  res.header("Access-Control-Allow-Headers", "*");
  res.end();
});

app.use('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

var indexRouter = require('./routes/index');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
// app.use(formidableMiddleware({
//   encoding: 'utf-8',
//   multiples: true, // req.files to be arrays of files
// }));



app.use('/', indexRouter);

app.use('*', function (req, res, next) {
  return res.status(404).json({
    error: 'Not found'
  })
});

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err.message === 'img-error') {
    return res.status(422).json([
      {
        field: 'images',
        error: 'Only .png, .jpg and .jpeg format allowed!'
      }
    ]);
  }

  if (!err.yupError && !(err.value && err.value.yupError)) {
    return res.status(err.status || 500).json({
      stack: err.stack,
      message: err.message
    });
  }

  if (!err.inner.length) {
    return res.status(422).json([
      {
        field: err.path,
        error: err.errors[0]
      }
    ]);
  }

  const errors = err.inner.map(item => {
    return {
      field: item.path,
      error: item.errors[0]
    }
  })

  return res.status(422).json(errors);
});

module.exports = app;

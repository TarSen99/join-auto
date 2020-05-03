"use strict";

var Mongoose = require('mongoose');

var MongooseSchema = require('mongoose').Schema;

var ResetPasswordSchema = new MongooseSchema({
  email: String,
  created_at: Date,
  token: String
});
module.exports = Mongoose.model('ResetPassword', ResetPasswordSchema);
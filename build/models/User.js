"use strict";

var Mongoose = require('mongoose');

var MongooseSchema = require('mongoose').Schema;

var bcrypt = require('bcrypt');

var randomString = require('randomstring');

var jwt = require('jsonwebtoken');

var config = require("../config");

var UserSchema = new MongooseSchema({
  email: String,
  user_name: String,
  password: String,
  created_at: Date,
  updated_at: Date,
  phone_number: String,
  location: String,
  rating: Number,
  is_admin: Boolean,
  email_code: String,
  email_verified: false,
  shared_products: [{
    type: Mongoose.Types.ObjectId,
    ref: 'Vehicle'
  }]
});
UserSchema.pre('save', function () {
  var saltRounds = 10;
  var salt = bcrypt.genSaltSync(saltRounds);
  var hashPassword = bcrypt.hashSync(this.password, salt);
  this.password = hashPassword;
  this.email_code = randomString.generate(72);
  this.created_at = new Date();
});

UserSchema.methods.generateToken = function () {
  return jwt.sign({
    id: this._id
  }, config.JWT_KEY);
};

UserSchema.methods.generateForgotPasswordToken = function () {
  return randomString.generate(72);
};

module.exports = Mongoose.model('User', UserSchema);
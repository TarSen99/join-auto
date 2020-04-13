const Mongoose = require('mongoose')
const MongooseSchema = require('mongoose').Schema
const bcrypt = require('bcrypt')
const randomString = require('randomstring')
const jwt = require('jsonwebtoken')
const config = require('@/config')

const UserSchema = new MongooseSchema({
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
  email_verified: false
})

UserSchema.pre('save', function () {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);

  const hashPassword = bcrypt.hashSync(this.password, salt); 
  this.password = hashPassword
  this.email_code = randomString.generate(72)
  this.created_at = new Date()
})

UserSchema.methods.generateToken = function () {
  return jwt.sign({id: this._id}, config.JWT_KEY)
}

module.exports = Mongoose.model('User', UserSchema)
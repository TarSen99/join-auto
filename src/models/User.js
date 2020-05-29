const Mongoose = require('mongoose')
const MongooseSchema = require('mongoose').Schema
const bcrypt = require('bcrypt')
const randomString = require('randomstring')
const jwt = require('jsonwebtoken')
const config = require('@/config')
const md5 = require('md5')

const UserSchema = new MongooseSchema({
  email: String,
  user_name: String,
  password: String,
  created_at: Date,
  updated_at: Date,
  phone_number: String,
  location: String,
  rate_array: [
    {
      from_user: { type: Mongoose.Types.ObjectId, ref: 'Vehicle' },
      created_at: Date,
      value: Number
    }
  ],
  rating: Number,
  is_admin: Boolean,
  email_code: String,
  email_verified: false,
  shared_products: [{ type: Mongoose.Types.ObjectId, ref: 'Vehicle' }],
  referal_token: String,
  views_history: [
    {
      product_id: { type: Mongoose.Types.ObjectId, ref: 'Vehicle' },
      token: String,
      created_at: Date
    }
  ]
})

const sendVerificationEmail = () => {

}

UserSchema.pre('save', function () {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);

  const hashPassword = bcrypt.hashSync(this.password, salt); 
  this.password = hashPassword
  this.email_code = randomString.generate(72)
  this.created_at = new Date()
  this.referal_token = md5(this.email.toLowerCase())

  sendVerificationEmail(this)
})

UserSchema.methods.generateToken = function () {
  return jwt.sign({id: this._id}, config.JWT_KEY)
}

UserSchema.methods.generateForgotPasswordToken = function () {
  return randomString.generate(72)
}

module.exports = Mongoose.model('User', UserSchema)
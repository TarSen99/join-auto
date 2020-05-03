const Mongoose = require('mongoose')
const MongooseSchema = require('mongoose').Schema

const ResetPasswordSchema = new MongooseSchema({
  email: String,
  created_at: Date,
  token: String
});

module.exports = Mongoose.model('ResetPassword', ResetPasswordSchema)
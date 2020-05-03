const Mongoose = require('mongoose')
const MongooseSchema = require('mongoose').Schema
const config = require('@/config')
const User = require('@/models/User.js')

const OrderSchema = new MongooseSchema({
  user_owner: { type: Mongoose.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  price_from: Number,
  price_to: Number,
  is_new: Boolean,
  vehicle_type: Number,
  body_type: Number,
  mileage: Number,
  engine: Number,
  transmittion: Number,
  wheel_drive: Number,
  color: String,
  is_done: Boolean,
  is_done_at: Date,
  year_from: Number,
  year_to: Number,
  model: String,
  selected_application: { type: Mongoose.Types.ObjectId, ref: 'Application' },
  applications: [
    { type: Mongoose.Types.ObjectId, ref: 'Application' }
  ]
})

module.exports = Mongoose.model('Order', OrderSchema)
const Mongoose = require('mongoose')
const MongooseSchema = require('mongoose').Schema
const config = require('@/config')
const User = require('@/models/User.js')

const VehicleSchema = new MongooseSchema({
  user_owner: { type: Mongoose.Types.ObjectId, ref: 'User' },
  description: String,
  price: Number,
  is_new: Boolean,
  vehicle_type: Number,
  year: Number,
  available_for_promote: Boolean,
  promote_compensation: Number,
  promote_compensation_type: Number,
  is_sold: Boolean,
  is_sold_to: { type: Mongoose.Types.ObjectId, ref: 'User' },
  is_sold_with_user_id: { type: Mongoose.Types.ObjectId, ref: 'User' },
  body_type: Number,
  mileage: Number,
  engine: Number,
  transmittion: Number,
  wheel_drive: Number,
  color: String,
  created_at: Date,
  brand: String,
  model: String,
  images: [String],
  buy_requests: [
    {
      user_id: { type: Mongoose.Types.ObjectId, ref: 'User' },
      user_name: String,
      comment: String,
      price: Number,
      approved: Boolean,
      created_at: Date,
      updated_at: Date,
      approved_at: Date,
      declined_at: Date
    }
  ]
})

VehicleSchema.pre('remove', async function () {
  const users = await User.find({ 'shared_products': this._id})
  
  users.forEach(user => {
    const docIndex = user.shared_products.findIndex(product => product._id.equals(this._id))
    user.shared_products.splice(docIndex, 1)
    user.save()
  })
})

module.exports = Mongoose.model('Vehicle', VehicleSchema)
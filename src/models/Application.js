const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const ApplicationSchema = new Schema({
  applicant_id: { type: Mongoose.SchemaTypes.ObjectId, ref: 'User'},
  applicant_name: String,
  order_id: { type: Mongoose.SchemaTypes.ObjectId, ref: 'Order' },
  message: String,
  created_at: Date,
  date_complete_to: Date,
  price: Number,
  is_completed: Boolean,
  approved: Boolean
})

module.exports = Mongoose.model('Application', ApplicationSchema)
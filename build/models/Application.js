"use strict";

var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;
var ApplicationSchema = new Schema({
  applicant_id: {
    type: Mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  order_id: {
    type: Mongoose.SchemaTypes.ObjectId,
    ref: 'Order'
  },
  message: String,
  created_at: Date,
  date_complete_to: Date,
  price: Number,
  is_completed: Boolean,
  approved: Boolean
});
module.exports = Mongoose.model('Application', ApplicationSchema);
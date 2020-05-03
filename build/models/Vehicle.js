"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Mongoose = require('mongoose');

var MongooseSchema = require('mongoose').Schema;

var config = require("../config");

var User = require("./User.js");

var VehicleSchema = new MongooseSchema({
  user_owner: {
    type: Mongoose.Types.ObjectId,
    ref: 'User'
  },
  description: String,
  price: Number,
  is_new: Boolean,
  vehicle_type: Number,
  available_for_promote: Boolean,
  promote_compensation: Number,
  promote_compensation_type: Number,
  is_sold: Boolean,
  is_sold_with_user_id: {
    type: Mongoose.Types.ObjectId,
    ref: 'User'
  },
  body_type: Number,
  mileage: Number,
  engine: Number,
  transmittion: Number,
  wheel_drive: Number,
  color: String,
  created_at: Date,
  buy_requests: [{
    user_id: {
      type: Mongoose.Types.ObjectId,
      ref: 'User'
    },
    comment: String,
    price: Number,
    approved: Boolean,
    created_at: Date,
    updated_at: Date,
    approved_at: Date,
    declined_at: Date
  }]
});
VehicleSchema.pre('remove', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var _this = this;

  var users;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return User.find({
            'shared_products': this._id
          });

        case 2:
          users = _context.sent;
          users.forEach(function (user) {
            var docIndex = user.shared_products.findIndex(function (product) {
              return product._id.equals(_this._id);
            });
            user.shared_products.splice(docIndex, 1);
            user.save();
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
module.exports = Mongoose.model('Vehicle', VehicleSchema);
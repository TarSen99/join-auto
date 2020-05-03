"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
VehicleSchema.pre('remove', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var _this = this;

  var users;
  return regeneratorRuntime.wrap(function _callee$(_context) {
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
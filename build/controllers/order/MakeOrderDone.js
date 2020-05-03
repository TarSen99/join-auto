"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Order = require("../../models/Order.js");

var User = require("../../models/User.js");

var Application = require("../../models/Application.js");
/**
 * @api {put} /order/complete makeOrderDone
 * @apiName makeOrderDone
 * @apiGroup Order
 *
 * @apiParam {String} order_id
 * 
 * 
 */


var makeOrderApplication = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, order_id, current_user_id, order, selectedApplication;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, order_id = _req$body.order_id, current_user_id = _req$body.current_user_id;
            _context.next = 3;
            return Order.findById(order_id).populate('selected_application').populate('user_owner');

          case 3:
            order = _context.sent;

            if (order) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              error: 'Order not found'
            }));

          case 6:
            if (order.user_owner._id.equals(current_user_id)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              error: 'Order not found'
            }));

          case 8:
            order.is_done = true;
            order.is_done_at = new Date();
            selectedApplication = order.selected_application;

            if (selectedApplication) {
              selectedApplication.is_completed = true;
            }

            _context.next = 14;
            return order.save();

          case 14:
            if (!selectedApplication) {
              _context.next = 17;
              break;
            }

            _context.next = 17;
            return selectedApplication.save();

          case 17:
            return _context.abrupt("return", res.status(200).json());

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function makeOrderApplication(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = makeOrderApplication;
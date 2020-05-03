"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, order_id, current_user_id, order, selectedApplication;

    return _regenerator["default"].wrap(function _callee$(_context) {
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
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Order = require("../../models/Order.js");

var Mongoose = require('mongoose');

var _require = require("../../constants.js"),
    USER_BASE_INFO_FIELDS = _require.USER_BASE_INFO_FIELDS;
/**
 * @api {get} /order/:id View order
 * @apiName View order
 * @apiGroup Order
 *
 * @apiParam {String} id
 *
 */


var addNewOrder = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var id, order;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            _context.next = 3;
            return Order.findById(id).populate({
              path: 'user_owner',
              select: USER_BASE_INFO_FIELDS
            });

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
            delete order._doc.applications;
            return _context.abrupt("return", res.status(200).json(order));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function addNewOrder(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = addNewOrder;
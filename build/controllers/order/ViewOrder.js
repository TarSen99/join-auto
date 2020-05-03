"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var id, order;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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
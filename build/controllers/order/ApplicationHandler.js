"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Order = require("../../models/Order.js");

var User = require("../../models/User.js");

var Application = require("../../models/Application.js");
/**
 * @api {post} /order/application/approve ApproveApplication
 * @apiName ApproveApplication
 * @apiGroup Order
 *
 * @apiParam {String} application_id
 * 
 * 
 */


var makeOrderApplication = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, current_user_id, application_id, application, orderOwner;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, current_user_id = _req$body.current_user_id, application_id = _req$body.application_id;
            _context.next = 3;
            return Application.findById(application_id).populate({
              path: 'order_id'
            });

          case 3:
            application = _context.sent;

            if (application) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              error: 'Application not found'
            }));

          case 6:
            _context.next = 8;
            return User.findById(application.order_id.user_owner);

          case 8:
            orderOwner = _context.sent;

            if (orderOwner._doc._id.equals(current_user_id)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              error: 'Application not found'
            }));

          case 11:
            req.body.application = application;
            req.body.orderOwner = orderOwner;
            next();

          case 14:
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
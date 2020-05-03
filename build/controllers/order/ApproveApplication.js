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
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, application_id, application;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, application_id = _req$body.application_id, application = _req$body.application;

            if (!application.order_id.selected_application) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              error: 'Order already filled'
            }));

          case 3:
            application.approved = true;
            application.order_id.selected_application = application_id;
            _context.next = 7;
            return application.save();

          case 7:
            _context.next = 9;
            return application.order_id.save();

          case 9:
            return _context.abrupt("return", res.status(200).json(application));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function makeOrderApplication(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = makeOrderApplication;
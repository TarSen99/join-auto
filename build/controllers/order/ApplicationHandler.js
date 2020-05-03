"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, current_user_id, application_id, application, orderOwner;

    return regeneratorRuntime.wrap(function _callee$(_context) {
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
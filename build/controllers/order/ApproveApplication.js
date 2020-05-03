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
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, application_id, application;

    return regeneratorRuntime.wrap(function _callee$(_context) {
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
"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Order = require("../../models/Order.js");

var User = require("../../models/User.js");

var Application = require("../../models/Application.js");
/**
 * @api {post} /order/application/decline declineApplication
 * @apiName declineApplication
 * @apiGroup Order
 *
 * @apiParam {String} application_id
 * 
 * 
 */


var makeOrderApplication = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, current_user_id, application_id, application, orderOwner, existingSelectedApplication;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, current_user_id = _req$body.current_user_id, application_id = _req$body.application_id, application = _req$body.application, orderOwner = _req$body.orderOwner;
            existingSelectedApplication = application.order_id.selected_application;

            if (existingSelectedApplication && existingSelectedApplication._id.equals(application_id)) {
              application.order_id.selected_application = null;
            }

            application.approved = false;
            _context.next = 6;
            return application.save();

          case 6:
            _context.next = 8;
            return application.order_id.save();

          case 8:
            return _context.abrupt("return", res.status(200).json({}));

          case 9:
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
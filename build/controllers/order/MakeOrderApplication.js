"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Order = require("../../models/Order.js");

var Application = require("../../models/Application.js");

var Mongoose = require('mongoose');

var _require = require("../../constants.js"),
    USER_BASE_INFO_FIELDS = _require.USER_BASE_INFO_FIELDS;
/**
 * @api {post} /order/application makeOrderApplication
 * @apiName makeOrderApplication
 * @apiGroup Order
 *
 * @apiParam {String} id order id
 * @apiParam {String} message 
 * @apiParam {Number} price 
 * @apiParam {Date} date_complete_to
 * 
 * 
 */


var makeOrderApplication = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, current_user_id, _req$body$message, message, price, _req$body$date_comple, date_complete_to, id, order, orderFromPersonAlreadyExists, application;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, current_user_id = _req$body.current_user_id, _req$body$message = _req$body.message, message = _req$body$message === void 0 ? null : _req$body$message, price = _req$body.price, _req$body$date_comple = _req$body.date_complete_to, date_complete_to = _req$body$date_comple === void 0 ? null : _req$body$date_comple, id = _req$body.id;
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
            if (!order.user_owner._id.equals(current_user_id)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              error: 'You can not make application for own product!'
            }));

          case 8:
            _context.next = 10;
            return Order.aggregate([{
              $unwind: '$applications'
            }, {
              $group: {
                _id: '$applications'
              }
            }, {
              $lookup: {
                from: 'applications',
                localField: '_id',
                foreignField: '_id',
                as: 'app_id'
              }
            }, {
              $unwind: '$app_id'
            }, {
              $group: {
                _id: '$app_id.applicant_id'
              }
            }, {
              $match: {
                _id: Mongoose.Types.ObjectId(current_user_id)
              }
            }]).then(function (value) {
              return value[0];
            });

          case 10:
            orderFromPersonAlreadyExists = _context.sent;

            if (!orderFromPersonAlreadyExists) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              error: 'Application already created'
            }));

          case 13:
            _context.next = 15;
            return Application.create({
              message: message,
              price: price || order.price,
              date_complete_to: date_complete_to,
              created_at: new Date(),
              is_completed: false,
              applicant_id: current_user_id,
              order_id: id
            });

          case 15:
            application = _context.sent;
            order.applications.push(application);
            _context.next = 19;
            return order.save();

          case 19:
            return _context.abrupt("return", res.status(200).json(application));

          case 20:
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
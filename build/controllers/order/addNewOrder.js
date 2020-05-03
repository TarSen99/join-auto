"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Order = require("../../models/Order.js");
/**
 * @api {post} /order/post Post new order
 * @apiName addNewOrder
 * @apiGroup Order
 *
 * @apiHeader {String} Authorization
 * @apiParam {String} title
 * @apiParam {String} description
 * @apiParam {Number} price_from
 * @apiParam {Number} price_to
 * @apiParam {Number} is_new
 * @apiParam {Number} vehicle_type
 * @apiParam {Number} body_type
 * @apiParam {Number} mileage
 * @apiParam {Number} engine
 * @apiParam {Number} transmittion
 * @apiParam {Number} wheel_drive
 * @apiParam {Number} color
 * @apiParam {String} model
 * @apiParam {Number} year_from
 * @apiParam {Number} year_to
 *
 */


var addNewOrder = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, current_user_id, title, description, price_from, price_to, is_new, vehicle_type, body_type, mileage, engine, transmittion, wheel_drive, color, model, year_from, year_to, order;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, current_user_id = _req$body.current_user_id, title = _req$body.title, description = _req$body.description, price_from = _req$body.price_from, price_to = _req$body.price_to, is_new = _req$body.is_new, vehicle_type = _req$body.vehicle_type, body_type = _req$body.body_type, mileage = _req$body.mileage, engine = _req$body.engine, transmittion = _req$body.transmittion, wheel_drive = _req$body.wheel_drive, color = _req$body.color, model = _req$body.model, year_from = _req$body.year_from, year_to = _req$body.year_to;
            _context.next = 3;
            return Order.create({
              user_owner: current_user_id,
              title: title,
              description: description,
              price_from: price_from,
              price_to: price_to,
              is_new: is_new,
              vehicle_type: vehicle_type,
              body_type: body_type,
              mileage: mileage,
              engine: engine,
              transmittion: transmittion,
              wheel_drive: wheel_drive,
              color: color,
              model: model,
              year_from: year_from,
              year_to: year_to,
              applications: []
            });

          case 3:
            order = _context.sent;
            return _context.abrupt("return", res.status(201).json(order));

          case 5:
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
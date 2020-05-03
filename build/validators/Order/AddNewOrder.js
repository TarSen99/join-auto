"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var yup = require('yup');

var Mongoose = require('mongoose');

var _require = require("../../constants.js"),
    MAX_PRICE_VALUE = _require.MAX_PRICE_VALUE;

var RegisterSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  price_from: yup.number().required(),
  price_to: yup.number()["default"](MAX_PRICE_VALUE),
  vehicle_type: yup.number().required(),
  is_new: yup["boolean"]().required(),
  body_type: yup.number(),
  mileage: yup.number().when('is_new', {
    is: false,
    then: yup.number().required(),
    otherwise: yup.number().notRequired()
  }),
  engine: yup.number().required(),
  transmittion: yup.number().required(),
  wheel_drive: yup.number().required(),
  color: yup.string().required()
});

module.exports = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, title, description, price_from, price_to, is_new, vehicle_type, body_type, mileage, engine, transmittion, wheel_drive, color;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, description = _req$body.description, price_from = _req$body.price_from, price_to = _req$body.price_to, is_new = _req$body.is_new, vehicle_type = _req$body.vehicle_type, body_type = _req$body.body_type, mileage = _req$body.mileage, engine = _req$body.engine, transmittion = _req$body.transmittion, wheel_drive = _req$body.wheel_drive, color = _req$body.color;
            _context.prev = 1;
            _context.next = 4;
            return RegisterSchema.validate({
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
              color: color
            }, {});

          case 4:
            next();
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", res.status(422).json(_defineProperty({}, _context.t0.path, _context.t0.message)));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 7]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
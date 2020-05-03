"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, title, description, price_from, price_to, is_new, vehicle_type, body_type, mileage, engine, transmittion, wheel_drive, color;

    return _regenerator["default"].wrap(function _callee$(_context) {
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
            return _context.abrupt("return", res.status(422).json((0, _defineProperty2["default"])({}, _context.t0.path, _context.t0.message)));

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
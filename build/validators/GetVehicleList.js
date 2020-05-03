"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var yup = require('yup');

var Schema = yup.object().shape({
  price_from: yup.string()["default"]('0'),
  is_new: yup["boolean"]()["default"](false),
  vehicle_type: yup.number(),
  available_for_promote: yup.number(),
  is_sold: yup.number(),
  body_type: yup.number(),
  mileage: yup.number(),
  engine: yup.number(),
  transmittion: yup.number(),
  wheel_drive: yup.number(),
  color: yup.number()
});

module.exports = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$query, price_from, price_to, is_new, vehicle_type, available_for_promote, is_sold, body_type, mileage, engine, transmittion, wheel_drive, color;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$query = req.query, price_from = _req$query.price_from, price_to = _req$query.price_to, is_new = _req$query.is_new, vehicle_type = _req$query.vehicle_type, available_for_promote = _req$query.available_for_promote, is_sold = _req$query.is_sold, body_type = _req$query.body_type, mileage = _req$query.mileage, engine = _req$query.engine, transmittion = _req$query.transmittion, wheel_drive = _req$query.wheel_drive, color = _req$query.color;
            _context.prev = 1;
            _context.next = 4;
            return Schema.validate({
              price_from: price_from,
              price_to: price_to,
              is_new: is_new,
              vehicle_type: vehicle_type,
              available_for_promote: available_for_promote,
              is_sold: is_sold,
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
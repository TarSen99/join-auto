"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var yup = require('yup');

var Mongoose = require('mongoose');

var RegisterSchema = yup.object().shape({
  user_owner_id: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  vehicle_type: yup.number().required(),
  available_for_promote: yup["boolean"]()["default"](false),
  promote_compensation: yup.number().when('$available_for_promote', {
    is: true,
    then: yup.number().required(),
    otherwise: yup.number().notRequired()
  }),
  promote_compensation_type: yup.number().when('available_for_promote', {
    is: true,
    then: yup.number().required(),
    otherwise: yup.number().notRequired()
  }),
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
    var _req$body, id, description, price, is_new, vehicle_type, available_for_promote, promote_compensation, promote_compensation_type, is_sold, is_sold_with_user_id, body_type, mileage, engine, transmittion, wheel_drive, color;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, id = _req$body.id, description = _req$body.description, price = _req$body.price, is_new = _req$body.is_new, vehicle_type = _req$body.vehicle_type, available_for_promote = _req$body.available_for_promote, promote_compensation = _req$body.promote_compensation, promote_compensation_type = _req$body.promote_compensation_type, is_sold = _req$body.is_sold, is_sold_with_user_id = _req$body.is_sold_with_user_id, body_type = _req$body.body_type, mileage = _req$body.mileage, engine = _req$body.engine, transmittion = _req$body.transmittion, wheel_drive = _req$body.wheel_drive, color = _req$body.color;

            if (Mongoose.Types.ObjectId.isValid(id)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              'email': 'User not found'
            }));

          case 3:
            _context.prev = 3;
            _context.next = 6;
            return RegisterSchema.validate({
              user_owner_id: id,
              description: description,
              price: price,
              is_new: is_new,
              vehicle_type: vehicle_type,
              available_for_promote: available_for_promote,
              promote_compensation: promote_compensation,
              promote_compensation_type: promote_compensation_type,
              is_sold: is_sold,
              is_sold_with_user_id: is_sold_with_user_id,
              body_type: body_type,
              mileage: mileage,
              engine: engine,
              transmittion: transmittion,
              wheel_drive: wheel_drive,
              color: color
            }, {});

          case 6:
            next();
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](3);
            return _context.abrupt("return", res.status(422).json(_defineProperty({}, _context.t0.path, _context.t0.message)));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 9]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var yup = require('yup');

var UserModel = require("../models/User.js");

var RegisterSchema = yup.object().shape({
  user_name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  phone_number: yup.string().required(),
  location: yup.string().required()
});

module.exports = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, user_name, email, password, phone_number, location, existingUser;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, user_name = _req$body.user_name, email = _req$body.email, password = _req$body.password, phone_number = _req$body.phone_number, location = _req$body.location;
            _context.prev = 1;
            _context.next = 4;
            return RegisterSchema.validate({
              user_name: user_name,
              email: email,
              password: password,
              phone_number: phone_number,
              location: location
            }, {});

          case 4:
            _context.next = 6;
            return UserModel.findOne({
              email: email
            });

          case 6:
            existingUser = _context.sent;

            if (!existingUser) {
              _context.next = 9;
              break;
            }

            throw new yup.ValidationError('This user already exist', req.body, 'email');

          case 9:
            next();
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", res.status(422).json((0, _defineProperty2["default"])({}, _context.t0.path, _context.t0.message)));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 12]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
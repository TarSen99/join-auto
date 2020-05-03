"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, user_name, email, password, phone_number, location, existingUser;

    return regeneratorRuntime.wrap(function _callee$(_context) {
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
            return _context.abrupt("return", res.status(422).json(_defineProperty({}, _context.t0.path, _context.t0.message)));

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
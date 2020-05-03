"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var yup = require('yup');

var Mongoose = require('mongoose');

var ViewOrderSchema = yup.object().shape({
  id: yup.string().required(),
  message: yup.string(),
  date_complete_to: yup.date(),
  price: yup.number()
});

module.exports = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$params, message, price, date_complete_to, id;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$params = req.params, message = _req$params.message, price = _req$params.price, date_complete_to = _req$params.date_complete_to, id = _req$params.id;

            if (Mongoose.Types.ObjectId.isValid(id)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              'id': 'Order not found'
            }));

          case 3:
            _context.prev = 3;
            _context.next = 6;
            return ViewOrderSchema.validate({
              id: id,
              price: price,
              date_complete_to: date_complete_to,
              message: message
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
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var yup = require('yup');

var Mongoose = require('mongoose');

var RegisterSchema = yup.object().shape({
  id: yup.string().required()
});

module.exports = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var id;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;

            if (Mongoose.Types.ObjectId.isValid(id)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              'id': 'Product not found'
            }));

          case 3:
            _context.prev = 3;
            _context.next = 6;
            return RegisterSchema.validate({
              id: id
            }, {});

          case 6:
            next();
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](3);
            return _context.abrupt("return", res.status(422).json((0, _defineProperty2["default"])({}, _context.t0.path, _context.t0.message)));

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
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var User = require("../../models/User.js");

var _require = require("../../constants.js"),
    USER_BASE_INFO_FIELDS = _require.USER_BASE_INFO_FIELDS;
/**
 * @api {get} /user/:id ViewUserInfo
 * @apiName ViewUserInfo
 * @apiGroup User
 *
 * @apiParam {id} user_id
 *
 */


var ViewUserInfo = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var id, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            _context.next = 3;
            return User.findById(id, USER_BASE_INFO_FIELDS);

          case 3:
            user = _context.sent;

            if (user) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              error: 'Not found'
            }));

          case 6:
            return _context.abrupt("return", res.status(200).json(user));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function ViewUserInfo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = ViewUserInfo;
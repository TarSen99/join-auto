"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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
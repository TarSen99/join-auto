"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = require("../../models/User.js");
/**
 * @api {get} /user/my-profile ViewOwnProfile
 * @apiName ViewOwnProfile
 * @apiGroup User
 *
 * @apiHeader {String} Authorization
 *
 */


var ViewOwnProfile = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var current_user_id, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            current_user_id = req.body.current_user_id;
            _context.next = 3;
            return User.findById(current_user_id, '-shared_products');

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

  return function ViewOwnProfile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = ViewOwnProfile;
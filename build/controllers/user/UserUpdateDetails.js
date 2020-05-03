"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = require("../../models/User.js");

var _require = require("../../constants.js"),
    USER_BASE_INFO_FIELDS = _require.USER_BASE_INFO_FIELDS;

var filterNulls = require("../../helpers/filterFromUndefined.js");
/**
 * @api {put} /user/update updateUserInfo
 * @apiName updateUserInfo
 * @apiGroup User
 *
 * @apiHeader {String} Authorization
 * 
 * @apiParam {String} user_name
 * @apiParam {String} password
 * @apiParam {String} phone_number
 * @apiParam {String} location
 *
 */


var UserUpdateDetails = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, current_user_id, phone_number, location, user_name, user, settingsToChange, propertyName;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, current_user_id = _req$body.current_user_id, phone_number = _req$body.phone_number, location = _req$body.location, user_name = _req$body.user_name;
            _context.next = 3;
            return User.findById(current_user_id);

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
            if (user._id.equals(current_user_id)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              error: 'Permission denied'
            }));

          case 8:
            settingsToChange = filterNulls({
              phone_number: phone_number,
              location: location,
              user_name: user_name
            });

            for (propertyName in settingsToChange) {
              user[propertyName] = settingsToChange[propertyName];
            }

            _context.next = 12;
            return user.save();

          case 12:
            return _context.abrupt("return", res.status(200).json(user));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function UserUpdateDetails(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = UserUpdateDetails;
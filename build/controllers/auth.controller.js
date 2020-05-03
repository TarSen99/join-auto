"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = require("../models/User");

var ResetPassword = require("../models/ResetPassword");

var qs = require('qs');

var yup = require('yup');

var bcrypt = require('bcrypt');

var getUserInfo = function getUserInfo(user) {
  var userParsed = qs.parse(user);
  var newObj = userParsed._doc;
  delete newObj.is_admin;
  delete newObj.email_code;
  delete newObj.__v;
  return newObj;
};
/**
 * @api {post} /login Login
 * @apiName Login
 * @apiGroup Auth
 * 
 * @apiParam {String} email
 * @apiParam {String} password
 * @apiSuccessExample {json} Success-Response:
 *  { "auth_token": "token_goes_here" }
 *  Save this to local storage and add to each request as Authorization header
 */


var login = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, email, password, existingUser, passwordMatch, token, userDetails;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.next = 3;
            return User.findOne({
              email: email
            });

          case 3:
            existingUser = _context.sent;

            if (existingUser) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              email: 'Check your credentials'
            }));

          case 6:
            _context.next = 8;
            return bcrypt.compare(password, existingUser._doc.password);

          case 8:
            passwordMatch = _context.sent;

            if (passwordMatch) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              email: 'Check your credentials'
            }));

          case 11:
            token = existingUser.generateToken();
            userDetails = getUserInfo(existingUser);
            return _context.abrupt("return", res.status(200).json(_objectSpread(_objectSpread({}, userDetails), {}, {
              auth_token: token
            })));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * @api {post} /sign-up Register
 * @apiName Register
 * @apiGroup Auth
 *
 * @apiParam {String} email
 * @apiParam {String} user_name
 * @apiParam {String} password
 * @apiParam {String} phone_number
 * @apiParam {String} location
 * @apiSuccessExample {json} Success-Response:
 *  { "auth_token": "token_goes_here" }
 *  Save this to local storage and add to each request as Authorization header
 */


var register = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, email, user_name, password, phone_number, location, user, token, userDetails;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, user_name = _req$body2.user_name, password = _req$body2.password, phone_number = _req$body2.phone_number, location = _req$body2.location;
            _context2.next = 3;
            return User.create({
              email: email,
              user_name: user_name,
              password: password,
              phone_number: phone_number,
              location: location,
              is_admin: false,
              shared_products: []
            });

          case 3:
            user = _context2.sent;
            token = user.generateToken();
            userDetails = getUserInfo(user);
            return _context2.abrupt("return", res.status(201).json(_objectSpread(_objectSpread({}, userDetails), {}, {
              auth_token: token
            })));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function register(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * @api {post} /forgot-password Forgot password
 * @apiName Forgot password
 * @apiGroup Auth
 *
 * @apiParam {String} email
 * @apiSuccessExample {json} Success-Response:
 *  { "token": "token_goes_here" }
 *  Reset password token
 */


var forgotPassword = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var email, user, userDetails, resetPasswordInstance;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            email = req.body.email;
            _context3.next = 3;
            return User.findOne({
              email: email
            });

          case 3:
            user = _context3.sent;

            if (user) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              email: 'User doesn\'t exist'
            }));

          case 6:
            userDetails = user._doc;
            _context3.next = 9;
            return ResetPassword.create({
              email: userDetails.email,
              created_at: new Date(),
              token: user.generateForgotPasswordToken()
            });

          case 9:
            resetPasswordInstance = _context3.sent;
            return _context3.abrupt("return", res.status(200).json(resetPasswordInstance._doc));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function forgotPassword(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * @api {post} /reset-password Reset password
 * @apiName Reset password
 * @apiGroup Auth
 *
 * @apiParam {String} token
 * @apiParam {String} password
 */


var resetPassword = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body3, token, password, resetPasswordInstance, _resetPasswordInstanc, email, created_at, now, createdAtPlusDay, saltRounds, salt, user;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body3 = req.body, token = _req$body3.token, password = _req$body3.password;
            _context4.next = 3;
            return ResetPassword.findOne({
              token: token
            });

          case 3:
            resetPasswordInstance = _context4.sent;

            if (resetPasswordInstance) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.status(422).json({
              password: 'token is invalid'
            }));

          case 6:
            _resetPasswordInstanc = resetPasswordInstance._doc, email = _resetPasswordInstanc.email, created_at = _resetPasswordInstanc.created_at;
            now = new Date().getTime();
            createdAtPlusDay = created_at.getTime() + 1 * 24 * 60 * 60 * 1000;

            if (!(now > createdAtPlusDay)) {
              _context4.next = 13;
              break;
            }

            _context4.next = 12;
            return resetPasswordInstance.deleteOne();

          case 12:
            return _context4.abrupt("return", res.status(422).json({
              password: 'token is expired'
            }));

          case 13:
            saltRounds = 10;
            salt = bcrypt.genSaltSync(saltRounds);
            _context4.next = 17;
            return User.findOneAndUpdate({
              email: email
            }, {
              password: bcrypt.hashSync(password, salt)
            });

          case 17:
            user = _context4.sent;
            _context4.next = 20;
            return resetPasswordInstance.deleteOne();

          case 20:
            return _context4.abrupt("return", res.status(200).json(user._doc));

          case 21:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function resetPassword(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

module.exports = {
  login: login,
  register: register,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword
};
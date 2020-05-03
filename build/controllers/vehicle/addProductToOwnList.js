"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Vehicle = require("../../models/Vehicle.js");

var User = require("../../models/User.js");

var _require = require("../../constants.js"),
    USER_BASE_INFO_FIELDS = _require.USER_BASE_INFO_FIELDS;
/**
 * @api {post} /product/add addProductToOwnList 
 * @apiDescription Add foreigh product to own list
 * @apiName addProductToOwnList
 * @apiGroup Product
 *
 * @apiHeader {String} Authorization
 *
 * @apiParam {String} product_id id of product
 */


var addProductToOwnList = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, current_user_id, product_id, product, user, shared_products, productAreadyShared;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, current_user_id = _req$body.current_user_id, product_id = _req$body.product_id;
            _context.next = 3;
            return Vehicle.findOne({
              _id: product_id
            }).populate({
              path: 'user_owner',
              select: USER_BASE_INFO_FIELDS
            });

          case 3:
            product = _context.sent;

            if (product) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              error: 'Product not found'
            }));

          case 6:
            if (!product.user_owner._id.equals(current_user_id)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              error: 'Product already added'
            }));

          case 8:
            _context.next = 10;
            return User.findById(current_user_id);

          case 10:
            user = _context.sent;
            shared_products = user.shared_products || [];
            productAreadyShared = shared_products.find(function (product) {
              return product._id.equals(product_id);
            });

            if (!productAreadyShared) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              error: 'Product already added'
            }));

          case 15:
            shared_products.push(product);
            user.shared_products = shared_products;
            user.save();
            return _context.abrupt("return", res.status(200).json(product));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function addProductToOwnList(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = addProductToOwnList;
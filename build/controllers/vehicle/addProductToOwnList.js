"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, current_user_id, product_id, product, user, shared_products, productAreadyShared;

    return _regenerator["default"].wrap(function _callee$(_context) {
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
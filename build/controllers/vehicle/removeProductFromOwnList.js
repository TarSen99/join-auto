"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Vehicle = require("../../models/Vehicle.js");

var User = require("../../models/User.js");

var _require = require("../../constants.js"),
    USER_BASE_INFO_FIELDS = _require.USER_BASE_INFO_FIELDS;
/**
 * @api {delete} /product/:id removeProductToOwnList 
 * @apiDescription Delete product from own list.
 *  If owner of product call this api,
 * the product will be removed totally!
 * @apiName removeProductToOwnList
 * @apiGroup Product
 *
 * @apiHeader {String} Authorization
 *
 * @apiParam {id} product_id id of product
 */


var removeProductToOwnList = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var current_user_id, product_id, product, user, shared_products, productAreadySharedIndex;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            current_user_id = req.body.current_user_id;
            product_id = req.params.id;
            _context.next = 4;
            return Vehicle.findOne({
              _id: product_id
            }).populate({
              path: 'user_owner',
              select: USER_BASE_INFO_FIELDS
            });

          case 4:
            product = _context.sent;

            if (product) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              error: 'Product not found'
            }));

          case 7:
            if (!product.user_owner._id.equals(current_user_id)) {
              _context.next = 11;
              break;
            }

            _context.next = 10;
            return product["delete"]();

          case 10:
            return _context.abrupt("return", res.status(200).json());

          case 11:
            _context.next = 13;
            return User.findById(current_user_id);

          case 13:
            user = _context.sent;
            shared_products = user.shared_products || [];
            productAreadySharedIndex = shared_products.findIndex(function (product) {
              return product._id.equals(product_id);
            });

            if (!(productAreadySharedIndex === -1)) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              error: 'Product not found'
            }));

          case 18:
            shared_products.splice(productAreadySharedIndex, 1);
            user.shared_products = shared_products;
            user.save();
            return _context.abrupt("return", res.status(200).json());

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function removeProductToOwnList(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = removeProductToOwnList;
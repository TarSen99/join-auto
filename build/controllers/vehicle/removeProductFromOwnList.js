"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var current_user_id, product_id, product, user, shared_products, productAreadySharedIndex;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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
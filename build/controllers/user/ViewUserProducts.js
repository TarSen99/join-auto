"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var User = require("../../models/User.js");

var Vehicle = require("../../models/Vehicle.js");

var _require = require("../../helpers/Pagination.js"),
    PaginationWrapper = _require.PaginationWrapper,
    PaginationFormatter = _require.PaginationFormatter;

var Mongoose = require('mongoose');
/**
 * @api {get} /user/products/:id ViewUserProducts
 * @apiName ViewUserProducts
 * @apiGroup User
 *
 * @apiParam {id} user_id
 *
 */


var ViewUserProducts = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var id, _req$query, _req$query$page, page, _req$query$limit, limit, concatItemsRequestSchema, productsCount, pagination, products;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            _req$query = req.query, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 20 : _req$query$limit;
            concatItemsRequestSchema = [{
              $match: {
                _id: Mongoose.Types.ObjectId(id)
              }
            }, {
              $group: {
                _id: '$shared_products'
              }
            }, {
              $unwind: '$_id'
            }, {
              $lookup: {
                from: 'vehicles',
                localField: '_id',
                foreignField: '_id',
                as: 'product'
              }
            }, {
              $group: {
                _id: '$product'
              }
            }, {
              $unwind: '$_id'
            }, {
              $replaceRoot: {
                newRoot: '$_id'
              }
            }, {
              $group: {
                _id: Mongoose.Types.ObjectId(id),
                shared_products: {
                  $push: '$$ROOT'
                }
              }
            }, {
              $lookup: {
                from: 'vehicles',
                localField: '_id',
                foreignField: 'user_owner_id',
                as: 'own_products'
              }
            }, {
              $project: {
                items: {
                  $concatArrays: ['$shared_products', '$own_products']
                },
                _id: 0
              }
            }, {
              $unwind: '$items'
            }, {
              $replaceRoot: {
                newRoot: '$items'
              }
            }];
            _context.next = 5;
            return User.aggregate([].concat(concatItemsRequestSchema, [{
              $count: 'count'
            }])).then(function (value) {
              return value[0] && value[0].count;
            });

          case 5:
            productsCount = _context.sent;
            pagination = new PaginationWrapper().setPage(page).setLimit(limit).setCount(productsCount || 0).build();
            _context.next = 9;
            return User.aggregate([].concat(concatItemsRequestSchema, [{
              $sort: {
                created_at: -1
              }
            }, {
              $skip: pagination.getSkippedItemsCount()
            }, {
              $limit: pagination.getPerPage()
            }, {
              $project: {
                buy_requests: 0,
                is_sold_with_user_id: 0
              }
            }]));

          case 9:
            products = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              products: products,
              pagination: new PaginationFormatter(pagination)
            }));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function ViewUserProducts(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = ViewUserProducts;
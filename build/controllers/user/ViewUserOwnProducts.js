"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = require("../../models/User.js");

var Vehicle = require("../../models/Vehicle.js");

var _require = require("../../helpers/Pagination.js"),
    PaginationWrapper = _require.PaginationWrapper,
    PaginationFormatter = _require.PaginationFormatter;

var Mongoose = require('mongoose');
/**
 * @api {get} /user/products/own ViewUserOwnProducts
 * @apiName ViewUserOwnProducts
 * @apiGroup User
 * @apiDescription Api only for private user profile view
 * @apiHeader {String} Authorization
 *
 */


var ViewUserOwnProducts = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var current_user_id, _req$query, _req$query$page, page, _req$query$limit, limit, count, pagination, products;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            current_user_id = req.body.current_user_id;
            _req$query = req.query, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 20 : _req$query$limit;
            _context.next = 4;
            return Vehicle.countDocuments({
              user_owner: current_user_id
            });

          case 4:
            count = _context.sent;
            pagination = new PaginationWrapper().setPage(page).setLimit(limit).setCount(count).build();
            _context.next = 8;
            return Vehicle.find({
              user_owner: current_user_id
            }).sort({
              created_at: -1
            }).skip(pagination.getSkippedItemsCount()).limit(pagination.getPerPage());

          case 8:
            products = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              products: products,
              pagination: new PaginationFormatter(pagination)
            }));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function ViewUserOwnProducts(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = ViewUserOwnProducts;
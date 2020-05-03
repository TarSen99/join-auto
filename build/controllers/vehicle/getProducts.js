"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Vehicle = require("../../models/Vehicle.js");

var SortWrapper = require("../../helpers/Sort.js");

var filterNulls = require("../../helpers/filterFromUndefined.js");

var _require = require("../../helpers/Pagination.js"),
    PaginationWrapper = _require.PaginationWrapper,
    PaginationFormatter = _require.PaginationFormatter;
/**
 * @api {get} /products getProducts
 * @apiName getProducts
 * @apiGroup Product
 *
 *
 * @apiParam {Number} price_from 
 * @apiParam {Number} price_to
 * @apiParam {Number} is_new 0 or 1
 * @apiParam {Number} vehicle_type
 * @apiParam {Number} available_for_promote 0 or 1
 * @apiParam {Number} is_sold  0 or 1
 * @apiParam {Number} body_type
 * @apiParam {Number} mileage
 * @apiParam {Number} engine
 * @apiParam {Number} transmittion
 * @apiParam {Number} wheel_drive
 * @apiParam {Number} color
 * @apiParam {String} sort default='created_at'
 * @apiParam {Number} order 1 or -1. Default is -1 (From greater to less)
 * @apiParam {Number} page default is 1
 * @apiParam {Number} limit default is 20. Products per page
 */


module.exports = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$query, _req$query$price_from, price_from, price_to, is_new, vehicle_type, available_for_promote, is_sold, body_type, mileage, engine, transmittion, wheel_drive, color, _req$query$sort, sort, _req$query$order, order, _req$query$page, page, _req$query$limit, limit, AVAILABLE_SORT_TYPES, DEFAULT_SORT_FIELD, sortOptions, newPriceTo, findModel, count, pagination, items;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$query = req.query, _req$query$price_from = _req$query.price_from, price_from = _req$query$price_from === void 0 ? 0 : _req$query$price_from, price_to = _req$query.price_to, is_new = _req$query.is_new, vehicle_type = _req$query.vehicle_type, available_for_promote = _req$query.available_for_promote, is_sold = _req$query.is_sold, body_type = _req$query.body_type, mileage = _req$query.mileage, engine = _req$query.engine, transmittion = _req$query.transmittion, wheel_drive = _req$query.wheel_drive, color = _req$query.color, _req$query$sort = _req$query.sort, sort = _req$query$sort === void 0 ? 'created_at' : _req$query$sort, _req$query$order = _req$query.order, order = _req$query$order === void 0 ? -1 : _req$query$order, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 20 : _req$query$limit;
            AVAILABLE_SORT_TYPES = ['price', 'mileage', 'created_at'];
            DEFAULT_SORT_FIELD = 'created_at';
            sortOptions = new SortWrapper().setType(sort).setOkTypes(AVAILABLE_SORT_TYPES).setDefault(DEFAULT_SORT_FIELD).setOrder(order).build();
            price_from = price_from ? +price_from.trim() : 0;
            price_to = price_to ? +price_to.trim() : null;

            if (price_to) {
              _context.next = 10;
              break;
            }

            _context.next = 9;
            return new Promise(function (res, rej) {
              Vehicle.find({}).select('price').sort({
                "price": -1
              }).limit(1).exec(function (err, doc) {
                if (err) rej(err);
                res(doc[0].price);
              });
            });

          case 9:
            newPriceTo = _context.sent;

          case 10:
            findModel = filterNulls({
              price: {
                $lte: newPriceTo || price_to,
                $gte: price_from
              },
              is_new: is_new,
              vehicle_type: vehicle_type,
              available_for_promote: available_for_promote,
              is_sold: is_sold,
              body_type: body_type,
              mileage: mileage,
              engine: engine,
              transmittion: transmittion,
              wheel_drive: wheel_drive,
              color: color
            });
            _context.next = 13;
            return Vehicle.countDocuments(findModel);

          case 13:
            count = _context.sent;
            pagination = new PaginationWrapper().setPage(page).setLimit(limit).setCount(count).build();
            _context.next = 17;
            return Vehicle.find(findModel).sort(_defineProperty({}, sortOptions.getFieldName(), sortOptions.getOrder())).skip(pagination.getSkippedItemsCount()).limit(pagination.getPerPage());

          case 17:
            items = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              count: count,
              pagination: new PaginationFormatter(pagination),
              items: items
            }));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
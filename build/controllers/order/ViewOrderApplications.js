"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Order = require("../../models/Order.js");

var Mongoose = require('mongoose');

var SortWrapper = require("../../helpers/Sort.js");

var filterNulls = require("../../helpers/filterFromUndefined.js");

var _require = require("../../helpers/Pagination.js"),
    PaginationWrapper = _require.PaginationWrapper,
    PaginationFormatter = _require.PaginationFormatter;
/**
 * @api {get} /order/applications/:id viewOrderApplications
 * @apiName viewOrderApplications
 * @apiGroup Order
 *
 * @apiParam {String} id
 * @apiDescription additional queries ?page=1&limit=20
 * Where page is curr page and limit is items per page
 */


var viewOrderApplications = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var id, _req$query, _req$query$page, page, _req$query$limit, limit, count, pagination, applications;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            _req$query = req.query, _req$query$page = _req$query.page, page = _req$query$page === void 0 ? 1 : _req$query$page, _req$query$limit = _req$query.limit, limit = _req$query$limit === void 0 ? 20 : _req$query$limit; //find by id
            //get just applications field
            //split this field on documents (each value of array will become separate doc)
            //count that documents and write it to field value

            _context.next = 4;
            return Order.aggregate([{
              $match: {
                _id: Mongoose.Types.ObjectId(id)
              }
            }, {
              $group: {
                _id: '$applications'
              }
            }, {
              $unwind: '$_id'
            }, {
              $count: 'value'
            }, {
              $project: {
                value: '$value'
              }
            }]).then(function (count) {
              return count[0] && count[0].value;
            });

          case 4:
            count = _context.sent;
            pagination = new PaginationWrapper().setPage(page).setLimit(limit).setCount(count || 0).build();
            _context.next = 8;
            return Order.findById(id).populate({
              path: 'applications',
              populate: {
                path: 'applications'
              },
              options: {
                sort: {
                  created_at: -1
                },
                skip: pagination.getSkippedItemsCount(),
                limit: pagination.getPerPage()
              }
            }).then(function (order) {
              return order.applications;
            });

          case 8:
            applications = _context.sent;

            if (applications) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              error: 'Applications not found'
            }));

          case 11:
            return _context.abrupt("return", res.status(200).json({
              applications: applications,
              pagination: new PaginationFormatter(pagination)
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function viewOrderApplications(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = viewOrderApplications;
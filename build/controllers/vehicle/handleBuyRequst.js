"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var Vehicle = require("../../models/Vehicle.js");

var _require = require("../../constants.js"),
    USER_BASE_INFO_FIELDS = _require.USER_BASE_INFO_FIELDS;

var handleBuyRequst = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, current_user_id, product_id, request_id, request_value, vehicle, productOwnerId, acceptedUserRequest, declinedUserRequest, requestToAccept;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, current_user_id = _req$body.current_user_id, product_id = _req$body.product_id, request_id = _req$body.request_id, request_value = _req$body.request_value;
            request_id = request_id.trim();
            product_id = product_id.trim();
            _context.next = 5;
            return Vehicle.findOne({
              _id: product_id
            }).populate({
              path: 'user_owner',
              select: USER_BASE_INFO_FIELDS
            });

          case 5:
            vehicle = _context.sent;
            productOwnerId = vehicle.user_owner._id.toString();

            if (!(productOwnerId !== current_user_id)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              error: 'Permission denied'
            }));

          case 9:
            acceptedUserRequest = vehicle.buy_requests.find(function (item) {
              return item.approved;
            });

            if (!(acceptedUserRequest && request_value)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              error: 'Buy request is already accepted'
            }));

          case 12:
            declinedUserRequest = vehicle.buy_requests.find(function (item) {
              return item.approved === false;
            });

            if (!(declinedUserRequest && !request_value)) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              error: 'Buy request is already declined'
            }));

          case 15:
            requestToAccept = vehicle.buy_requests.find(function (item) {
              return item._id.toString() === request_id;
            });

            if (requestToAccept) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              error: 'Request not found'
            }));

          case 18:
            requestToAccept.approved = request_value;

            if (request_value) {
              requestToAccept.approved_at = new Date();
              requestToAccept.declined_at = null;
            } else {
              requestToAccept.declined_at = new Date();
              requestToAccept.approved_at = null;
            }

            _context.next = 22;
            return vehicle.save();

          case 22:
            return _context.abrupt("return", res.status(201).json(requestToAccept));

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleBuyRequst(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = handleBuyRequst;
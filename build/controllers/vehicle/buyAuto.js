"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = require("../../models/User");

var Vehicle = require("../../models/Vehicle.js");

var USER_BASE_INFO_FIELDS = 'email user_name phone_number _id location';
/**
 * @api {post} /product/buy buyAuto
 * @apiName buyAuto
 * @apiGroup Product
 *
 * @apiHeader {String} Authorization
 * 
 * @apiParam {String} product_id id of product
 * @apiParam {String} comment id of product
 * @apiParam {Number} price price you want buy for
 */

var buyAuto = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, current_user_id, product_id, comment, price, vehicle, _id, ownerVehicleId, buy_requests, alreadyApproved, existingRequest, now;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, current_user_id = _req$body.current_user_id, product_id = _req$body.product_id, comment = _req$body.comment, price = _req$body.price;
            product_id = product_id.trim();
            comment = comment.trim();
            _context.next = 5;
            return Vehicle.findOne({
              _id: product_id
            }).populate({
              path: 'user_owner',
              select: USER_BASE_INFO_FIELDS
            });

          case 5:
            vehicle = _context.sent;
            _id = vehicle.user_owner._id;
            ownerVehicleId = _id.toString().trim();
            buy_requests = vehicle._doc.buy_requests;

            if (!(current_user_id === ownerVehicleId)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              error: "Couldn't buy own product."
            }));

          case 11:
            alreadyApproved = buy_requests.find(function (item) {
              return item.approved;
            });

            if (!alreadyApproved) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              error: 'Product already approved'
            }));

          case 14:
            existingRequest = buy_requests.find(function (item) {
              return item.user_id.toString() === current_user_id;
            });

            if (!existingRequest) {
              _context.next = 24;
              break;
            }

            now = new Date();
            existingRequest.price = price;
            existingRequest.approved = null;
            existingRequest.updated_at = now;
            existingRequest.comment = comment;
            _context.next = 23;
            return vehicle.save();

          case 23:
            return _context.abrupt("return", res.status(200).json({
              approved: false,
              updated_at: now
            }));

          case 24:
            buy_requests.push({
              user_id: current_user_id,
              comment: comment,
              approved: null,
              created_at: new Date(),
              updated_at: null,
              price: price
            });
            _context.next = 27;
            return vehicle.save();

          case 27:
            return _context.abrupt("return", res.status(201).json({
              approved: false
            }));

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function buyAuto(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = buyAuto;
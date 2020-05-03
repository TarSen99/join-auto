"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = require("../models/User");

var Vehicle = require("../models/Vehicle.js");

var getProducts = require("./vehicle/getProducts.js");

var buyAuto = require("./vehicle/buyAuto.js");

var handleBuyRequst = require("./vehicle/handleBuyRequst.js");
/**
 * @api {post} /product/post postProduct
 * @apiName postProduct
 * @apiGroup Product
 *
 * @apiHeader {String} Authorization token
 * 
 * @apiParam {String} id user owner id
 * @apiParam {String} description
 * @apiParam {Number} price
 * @apiParam {Number} is_new 0 or 1
 * @apiParam {Number} vehicle_type
 * @apiParam {Number} available_for_promote  0 or 1
 * @apiParam {Number} promote_compensation_type
 * @apiParam {Number} body_type
 * @apiParam {Number} mileage
 * @apiParam {Number} engine
 * @apiParam {Number} transmittion
 * @apiParam {Number} wheel_drive
 * @apiParam {Number} color
 */


var postProduct = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, id, description, price, is_new, vehicle_type, available_for_promote, promote_compensation, promote_compensation_type, body_type, mileage, engine, transmittion, wheel_drive, color, userOwner, vehicle;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, id = _req$body.id, description = _req$body.description, price = _req$body.price, is_new = _req$body.is_new, vehicle_type = _req$body.vehicle_type, available_for_promote = _req$body.available_for_promote, promote_compensation = _req$body.promote_compensation, promote_compensation_type = _req$body.promote_compensation_type, body_type = _req$body.body_type, mileage = _req$body.mileage, engine = _req$body.engine, transmittion = _req$body.transmittion, wheel_drive = _req$body.wheel_drive, color = _req$body.color;
            _context.next = 3;
            return User.findById(id);

          case 3:
            userOwner = _context.sent;

            if (userOwner) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              'email': 'User not found'
            }));

          case 6:
            _context.next = 8;
            return Vehicle.create({
              user_owner: id,
              description: description,
              price: price,
              is_new: is_new,
              vehicle_type: vehicle_type,
              available_for_promote: available_for_promote,
              promote_compensation: promote_compensation,
              promote_compensation_type: promote_compensation_type,
              is_sold: false,
              body_type: body_type,
              mileage: mileage,
              engine: engine,
              transmittion: transmittion,
              wheel_drive: wheel_drive,
              color: color,
              created_at: new Date()
            });

          case 8:
            vehicle = _context.sent;
            return _context.abrupt("return", res.status(200).json(vehicle));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function postProduct(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * @api {get} /products/:id getProductDetails
 * @apiName getProductDetails
 * @apiGroup Product
 *
 *
 * @apiParam {String} id id of product
 */


var getProductDetails = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, vehicle;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.next = 3;
            return Vehicle.findById(id);

          case 3:
            vehicle = _context2.sent;

            if (vehicle) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              id: 'Product not found'
            }));

          case 6:
            return _context2.abrupt("return", res.status(200).json(vehicle));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getProductDetails(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = {
  postProduct: postProduct,
  getProductDetails: getProductDetails,
  getProducts: getProducts,
  buyAuto: buyAuto,
  handleBuyRequst: handleBuyRequst
};
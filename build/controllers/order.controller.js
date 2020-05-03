"use strict";

var addNewOrder = require("./order/addNewOrder.js");

var ViewOrder = require("./order/ViewOrder.js");

var ViewOrderApplications = require("./order/ViewOrderApplications.js");

var MakeOrderApplication = require("./order/MakeOrderApplication.js");

var ApproveApplication = require("./order/ApproveApplication.js");

var DeclineApplication = require("./order/DeclineApplication.js");

var ApplicationHandler = require("./order/ApplicationHandler.js");

var MakeOrderDone = require("./order/MakeOrderDone.js");

module.exports = {
  addNewOrder: addNewOrder,
  ViewOrder: ViewOrder,
  ViewOrderApplications: ViewOrderApplications,
  MakeOrderApplication: MakeOrderApplication,
  ApproveApplication: ApproveApplication,
  DeclineApplication: DeclineApplication,
  ApplicationHandler: ApplicationHandler,
  MakeOrderDone: MakeOrderDone
};
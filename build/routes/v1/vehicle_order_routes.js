"use strict";

var Router = require('express-promise-router');

var checkAuth = require("../../middleware/checkAuth.js");

var vehicleOrderRouter = new Router();

var _require = require("../../controllers/order.controller.js"),
    addNewOrder = _require.addNewOrder,
    ViewOrder = _require.ViewOrder,
    ViewOrderApplications = _require.ViewOrderApplications,
    MakeOrderApplication = _require.MakeOrderApplication,
    ApproveApplication = _require.ApproveApplication,
    DeclineApplication = _require.DeclineApplication,
    ApplicationHandler = _require.ApplicationHandler,
    MakeOrderDone = _require.MakeOrderDone;

var AddNewOrderValidator = require("../../validators/Order/AddNewOrder.js");

var ViewOrderValidator = require("../../validators/Order/ViewOrder.js");

var ViewOrderApplicationsValidator = require("../../validators/Order/ViewOrderApplications.js");

var ApplicationHandlerValidator = require("../../validators/Order/ApplicationHandler.js");

var MakeOrderDoneValidator = require("../../validators/Order/MakeOrderDone.js");

vehicleOrderRouter.post('/post', checkAuth, AddNewOrderValidator, addNewOrder);
vehicleOrderRouter.get('/:id', ViewOrderValidator, ViewOrder);
vehicleOrderRouter.get('/applications/:id', ViewOrderApplicationsValidator, ViewOrderApplications);
vehicleOrderRouter.post('/application', checkAuth, MakeOrderApplication);
vehicleOrderRouter.post('/application/approve', checkAuth, ApplicationHandlerValidator, ApplicationHandler, ApproveApplication);
vehicleOrderRouter.post('/application/decline', checkAuth, ApplicationHandlerValidator, ApplicationHandler, DeclineApplication);
vehicleOrderRouter.put('/complete', checkAuth, MakeOrderDoneValidator, MakeOrderDone);
module.exports = vehicleOrderRouter;
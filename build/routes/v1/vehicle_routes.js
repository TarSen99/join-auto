"use strict";

var Router = require('express-promise-router');

var checkAuth = require("../../middleware/checkAuth.js");

var vehicleRouter = new Router();

var _require = require("../../controllers/vehicle.contoller.js"),
    postProduct = _require.postProduct,
    getProductDetails = _require.getProductDetails,
    getProducts = _require.getProducts,
    buyAuto = _require.buyAuto,
    handleBuyRequst = _require.handleBuyRequst;

var approveBuyRequest = require("../../controllers/vehicle/approveBuyRequest.js");

var declineBuyRequest = require("../../controllers/vehicle/declineBuyRequest.js");

var addProductToOwnList = require("../../controllers/vehicle/addProductToOwnList.js");

var removeProductFromOwnList = require("../../controllers/vehicle/removeProductFromOwnList.js");

var PostVehicleValidator = require("../../validators/PostVehicle.js");

var GetVehicleValidator = require("../../validators/GetVehicle.js");

var GetVehicleListValidator = require("../../validators/GetVehicleList.js");

var BuyAutoValidator = require("../../validators/Vehicle/BuyAuto.js");

var HandleBuyRequestValidator = require("../../validators/Vehicle/HandleBuyRequest.js");

var AddProductToOwnListValidator = require("../../validators/Vehicle/AddProductToOwnList.js");

var RemoveProductFromOwnListValidator = require("../../validators/Vehicle/RemoveProductFromOwnList.js");

vehicleRouter.post('/product/post', checkAuth, PostVehicleValidator, postProduct);
vehicleRouter.get('/products/:id', GetVehicleValidator, getProductDetails);
vehicleRouter.get('/products', GetVehicleListValidator, getProducts);
vehicleRouter.post('/product/buy', checkAuth, BuyAutoValidator, buyAuto);
vehicleRouter.post('/product/approve', checkAuth, HandleBuyRequestValidator, approveBuyRequest, handleBuyRequst);
vehicleRouter.post('/product/decline', checkAuth, HandleBuyRequestValidator, declineBuyRequest, handleBuyRequst);
vehicleRouter.post('/product/add', checkAuth, AddProductToOwnListValidator, addProductToOwnList);
vehicleRouter["delete"]('/product/:id', checkAuth, RemoveProductFromOwnListValidator, removeProductFromOwnList);
module.exports = vehicleRouter;
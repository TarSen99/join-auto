"use strict";

var express = require('express');

var router = require('express-promise-router')();

var authRouter = require("./auth_routes.js");

var vehicleRouter = require("./vehicle_routes.js");

var vehicleOrderRouter = require("./vehicle_order_routes.js");

var userRouter = require("./user_routes.js");

router.use(authRouter);
router.use(vehicleRouter);
router.use('/order', vehicleOrderRouter);
router.use('/user', userRouter);
router.all('*', function (req, res) {
  return res.status(404).json({
    error: 'Page not found'
  });
});
module.exports = router;
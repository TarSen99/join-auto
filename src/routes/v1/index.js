var express = require('express');
var router = require('express-promise-router')();

const authRouter = require('./auth_routes.js')
const vehicleRouter = require('./vehicle_routes.js')
const vehicleOrderRouter = require('./vehicle_order_routes.js')
const userRouter = require('./user_routes.js')

router.use(authRouter)
router.use(vehicleRouter)
router.use('/order', vehicleOrderRouter)
router.use('/user', userRouter)

module.exports = router;

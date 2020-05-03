"use strict";

var Router = require('express-promise-router');

var v1Routes = require("./v1");

var router = new Router();
router.use('/v1', v1Routes);
module.exports = router;
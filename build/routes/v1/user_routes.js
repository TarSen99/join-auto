"use strict";

var Router = require('express-promise-router');

var userRouter = new Router();

var checkAuth = require("../../middleware/checkAuth.js");

var ViewUserInfoValidator = require("../../validators/user/ViewUserInfo.js");

var _require = require("../../controllers/user.controller.js"),
    ViewUserInfo = _require.ViewUserInfo,
    ViewUserProducts = _require.ViewUserProducts,
    UserUpdateDetails = _require.UserUpdateDetails,
    ViewOwnProfile = _require.ViewOwnProfile,
    ViewUserSharedProducts = _require.ViewUserSharedProducts,
    ViewUserOwnProducts = _require.ViewUserOwnProducts;

userRouter.put('/update', checkAuth, UserUpdateDetails);
userRouter.get('/my-profile', checkAuth, ViewOwnProfile);
userRouter.get('/products/shared', checkAuth, ViewUserSharedProducts);
userRouter.get('/products/own', checkAuth, ViewUserOwnProducts);
userRouter.get('/products/:id', ViewUserInfoValidator, ViewUserProducts);
userRouter.get('/:id', ViewUserInfoValidator, ViewUserInfo);
module.exports = userRouter;
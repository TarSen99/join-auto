"use strict";

var Router = require('express-promise-router');

var authRouter = new Router();

var _require = require("../../controllers/auth.controller.js"),
    login = _require.login,
    register = _require.register,
    forgotPassword = _require.forgotPassword,
    resetPassword = _require.resetPassword;

var registerValidator = require("../../validators/register.js");

var loginValidator = require("../../validators/login.js");

var forgotPasswordValidator = require("../../validators/ForgotPassword.js");

var ResetPasswordValidator = require("../../validators/ResetPassword.js");

var checkAuth = require("../../middleware/checkAuth.js");

authRouter.post('/login', loginValidator, login);
authRouter.post('/sign-up', registerValidator, register);
authRouter.post('/forgot-password', forgotPasswordValidator, forgotPassword);
authRouter.post('/reset-password', ResetPasswordValidator, resetPassword);
module.exports = authRouter;
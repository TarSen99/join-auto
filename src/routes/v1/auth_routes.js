const Router = require('express-promise-router')
const authRouter = new Router()

const { login, register, forgotPassword, resetPassword} = require('@controllers/auth.controller.js')
const registerValidator = require('@/validators/register.js')
const loginValidator = require('@/validators/login.js')
const forgotPasswordValidator = require('@/validators/ForgotPassword.js')
const ResetPasswordValidator = require('@/validators/ResetPassword.js')
const checkAuth = require('@/middleware/checkAuth.js')

authRouter.post('/login', loginValidator, login)
authRouter.post('/sign-up', registerValidator, register)
authRouter.post('/forgot-password', forgotPasswordValidator, forgotPassword)
authRouter.post('/reset-password', ResetPasswordValidator, resetPassword)

module.exports = authRouter
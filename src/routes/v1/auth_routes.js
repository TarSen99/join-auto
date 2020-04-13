const Router = require('express').Router
const authRouter = new Router()

const { login, register } = require('@controllers/auth.controller.js')
const registerValidator = require('@/validators/register.js')
const loginValidator = require('@/validators/login.js')
const checkAuth = require('@/middleware/checkAuth.js')

authRouter.post('/login', loginValidator, login)
authRouter.post('/sign-up', registerValidator, register)

module.exports = authRouter
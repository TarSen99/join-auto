const Router = require('express-promise-router')
const userRouter = new Router()

const checkAuth = require('@/middleware/checkAuth.js')
const ViewUserInfoValidator = require('@/validators/user/ViewUserInfo.js')

const {
  ViewUserInfo,
  ViewUserProducts,
  UserUpdateDetails,
  ViewOwnProfile,
  ViewUserSharedProducts,
  ViewUserOwnProducts,
  RateUser
} = require('@/controllers/user.controller.js')

userRouter.post('/rate', checkAuth, RateUser)
userRouter.put('/update', checkAuth, UserUpdateDetails)
userRouter.get('/my-profile', checkAuth, ViewOwnProfile)
userRouter.get('/products/shared', checkAuth, ViewUserSharedProducts)
userRouter.get('/products/own', checkAuth, ViewUserOwnProducts)
userRouter.get('/products/:id', ViewUserInfoValidator, ViewUserProducts)
userRouter.get('/:id', ViewUserInfoValidator, ViewUserInfo)

module.exports = userRouter
const Router = require('express-promise-router')
const checkAuth = require('@/middleware/checkAuth.js')
const vehicleOrderRouter = new Router()

const { 
  addNewOrder,
  ViewOrder,
  ViewOrderApplications,
  MakeOrderApplication,
  ApproveApplication,
  DeclineApplication,
  ApplicationHandler,
  MakeOrderDone,
  getOrders
} = require('@/controllers/order.controller.js')

const AddNewOrderValidator = require('@/validators/Order/AddNewOrder.js')
const ViewOrderValidator = require('@/validators/Order/ViewOrder.js')
const ViewOrderApplicationsValidator = require('@/validators/Order/ViewOrderApplications.js')
const ApplicationHandlerValidator = require('@/validators/Order/ApplicationHandler.js')
const MakeOrderDoneValidator = require('@/validators/Order/MakeOrderDone.js')

vehicleOrderRouter.get('/list', getOrders)
vehicleOrderRouter.post('/post', checkAuth, AddNewOrderValidator, addNewOrder)
vehicleOrderRouter.get('/:id', ViewOrderValidator, ViewOrder)
vehicleOrderRouter.get('/applications/:id', ViewOrderApplicationsValidator, ViewOrderApplications)
vehicleOrderRouter.post('/application', checkAuth, MakeOrderApplication)
vehicleOrderRouter.post('/application/approve', checkAuth, ApplicationHandlerValidator, ApplicationHandler, ApproveApplication)
vehicleOrderRouter.post('/application/decline', checkAuth, ApplicationHandlerValidator, ApplicationHandler, DeclineApplication)
vehicleOrderRouter.put('/complete', checkAuth, MakeOrderDoneValidator, MakeOrderDone)

module.exports = vehicleOrderRouter
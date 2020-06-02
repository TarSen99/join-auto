const addNewOrder = require('@/controllers/order/addNewOrder.js')
const ViewOrder = require('@/controllers/order/ViewOrder.js')
const ViewOrderApplications = require('@/controllers/order/ViewOrderApplications.js')
const MakeOrderApplication = require('@/controllers/order/MakeOrderApplication.js')
const ApproveApplication = require('@/controllers/order/ApproveApplication.js')
const DeclineApplication = require('@/controllers/order/DeclineApplication.js')
const ApplicationHandler = require('@/controllers/order/ApplicationHandler.js')
const MakeOrderDone = require('@/controllers/order/MakeOrderDone.js')
const getOrders = require('@/controllers/order/getOrders.js')

module.exports = {
  addNewOrder,
  ViewOrder,
  ViewOrderApplications,
  MakeOrderApplication,
  ApproveApplication,
  DeclineApplication,
  ApplicationHandler,
  MakeOrderDone,
  getOrders
}
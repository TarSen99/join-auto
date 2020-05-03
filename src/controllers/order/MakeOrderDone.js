const Order = require('@/models/Order.js')
const User = require('@/models/User.js')
const Application = require('@/models/Application.js')

/**
 * @api {put} /order/complete makeOrderDone
 * @apiName makeOrderDone
 * @apiGroup Order
 *
 * @apiParam {String} order_id
 * 
 * 
 */

const makeOrderApplication = async (req, res, next) => {
  const {
    order_id,
    current_user_id
  } = req.body

  const order = await Order.findById(order_id)
    .populate('selected_application')
    .populate('user_owner')

  if (!order) {
    return res.status(404).json({
      error: 'Order not found'
    })
  }
  
  if (!order.user_owner._id.equals(current_user_id)) {
    return res.status(404).json({
      error: 'Order not found'
    })
  }

  order.is_done = true
  order.is_done_at = new Date()

  const selectedApplication = order.selected_application

  if (selectedApplication) {
    selectedApplication.is_completed = true
  }

  await order.save()

  if (selectedApplication) {
    await selectedApplication.save()
  }

  return res.status(200).json()
}

module.exports = makeOrderApplication
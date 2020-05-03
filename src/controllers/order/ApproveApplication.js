const Order = require('@/models/Order.js')
const User = require('@/models/User.js')
const Application = require('@/models/Application.js')

/**
 * @api {post} /order/application/approve ApproveApplication
 * @apiName ApproveApplication
 * @apiGroup Order
 *
 * @apiParam {String} application_id
 * 
 * 
 */

const makeOrderApplication = async (req, res) => {
  const {
    application_id,
    application
  } = req.body

  if (application.order_id.selected_application) {
    return res.status(403).json({
      error: 'Order already filled'
    })
  }

  application.approved = true
  application.order_id.selected_application = application_id

  await application.save()
  await application.order_id.save()

  return res.status(200).json(application)
}

module.exports = makeOrderApplication
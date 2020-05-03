const Order = require('@/models/Order.js')
const User = require('@/models/User.js')
const Application = require('@/models/Application.js')

/**
 * @api {post} /order/application/decline declineApplication
 * @apiName declineApplication
 * @apiGroup Order
 *
 * @apiParam {String} application_id
 * 
 * 
 */

const makeOrderApplication = async (req, res) => {
  const {
    current_user_id,
    application_id,
    application,
    orderOwner
  } = req.body

  const existingSelectedApplication = application.order_id.selected_application

  if (existingSelectedApplication && existingSelectedApplication._id.equals(application_id)) {
    application.order_id.selected_application = null
  }

  application.approved = false

  await application.save()
  await application.order_id.save()

  return res.status(200).json({})
}

module.exports = makeOrderApplication
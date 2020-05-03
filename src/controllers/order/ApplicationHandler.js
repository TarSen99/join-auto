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

const makeOrderApplication = async (req, res, next) => {
  const {
    current_user_id,
    application_id
  } = req.body

  const application = await Application.findById(application_id)
    .populate({ path: 'order_id' })

  if (!application) {
    return res.status(404).json({
      error: 'Application not found'
    })
  }

  const orderOwner = await User.findById(application.order_id.user_owner)

  if (!orderOwner._doc._id.equals(current_user_id)) {
    return res.status(404).json({
      error: 'Application not found'
    })
  }

  req.body.application = application
  req.body.orderOwner = orderOwner

  next()
}

module.exports = makeOrderApplication
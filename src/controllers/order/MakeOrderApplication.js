const Order = require('@/models/Order.js')
const User = require('@/models/User.js')
const Application = require('@/models/Application.js')
const Mongoose = require('mongoose')
const { USER_BASE_INFO_FIELDS } = require('@/constants.js')

/**
 * @api {post} /order/application makeOrderApplication
 * @apiName makeOrderApplication
 * @apiGroup Order
 *
 * @apiParam {String} id order id
 * @apiParam {String} message 
 * @apiParam {Number} price 
 * @apiParam {Date} npm 
 * 
 * 
 */

const makeOrderApplication = async (req, res) => {
  const {
    current_user_id,
    message = null,
    price,
    date_complete_to = null,
    id,
  } = req.body

  const order = await Order.findById(id)
    .populate({ path: 'user_owner', select: USER_BASE_INFO_FIELDS })
  
  if (!order) {
    return res.status(404).json({
      error: 'Order not found'
    })
  }

  if (order.user_owner._id.equals(current_user_id)) {
    return res.status(403).json({
      error: 'You can not make application for own product!'
    })
  }

  const orderFromPersonAlreadyExists = await Order.aggregate([
    { $match: { _id: Mongoose.Types.ObjectId(id) } },
    { $unwind: '$applications' },
    { $group: { _id: '$applications'}},
    { $lookup: { from: 'applications', localField: '_id', foreignField: '_id', as: 'app_id' } },
    { $unwind: '$app_id' },
    { $group: { _id: '$app_id.applicant_id'}},
    { $match: { _id: Mongoose.Types.ObjectId(current_user_id) }}
  ]).then(value => {
    return value[0]
  })

  if (orderFromPersonAlreadyExists) {
      return res.status(403).json({
        error: 'Application already created'
      })
  }

  const currUser = await User.findById(current_user_id)

  const application = await Application.create({
    message,
    price: price || order.price,
    date_complete_to,
    created_at: new Date(),
    is_completed: false,
    applicant_id: current_user_id,
    applicant_name: currUser.user_name,
    order_id: id,
    approved: null
  })

  order.applications.push(application)

  await order.save()

  return res.status(200).json(application)
}

module.exports = makeOrderApplication
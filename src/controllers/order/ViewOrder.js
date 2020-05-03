const Order = require('@/models/Order.js')
const Mongoose = require('mongoose')
const { USER_BASE_INFO_FIELDS} = require('@/constants.js')

/**
 * @api {get} /order/:id View order
 * @apiName View order
 * @apiGroup Order
 *
 * @apiParam {String} id
 *
 */

const addNewOrder = async (req, res) => {
  const {
    id,
  } = req.params

  const order = await Order.findById(id)
    .populate({ path: 'user_owner', select: USER_BASE_INFO_FIELDS })
  
  if (!order) {
    return res.status(404).json({
      error: 'Order not found'
    })
  }

  delete order._doc.applications

  return res.status(200).json(order)
}

module.exports = addNewOrder
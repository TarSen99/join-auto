const Order = require('@/models/Order.js')

/**
 * @api {post} /order/post Post new order
 * @apiName addNewOrder
 * @apiGroup Order
 *
 * @apiHeader {String} Authorization
 * @apiParam {String} title
 * @apiParam {String} description
 * @apiParam {Number} price_from
 * @apiParam {Number} price_to
 * @apiParam {Number} is_new
 * @apiParam {Number} vehicle_type
 * @apiParam {Number} body_type
 * @apiParam {Number} mileage
 * @apiParam {Number} engine
 * @apiParam {Number} transmittion
 * @apiParam {Number} wheel_drive
 * @apiParam {Number} color
 * @apiParam {String} model
 * @apiParam {Number} year_from
 * @apiParam {Number} year_to
 *
 */

const addNewOrder = async (req, res) => {
  const {
    current_user_id,
    title,
    description,
    price_from,
    price_to,
    is_new,
    vehicle_type,
    body_type,
    mileage,
    engine,
    transmittion,
    wheel_drive,
    color,
    model,
    year_from,
    year_to
  } = req.body

  const order = await Order.create({
    user_owner: current_user_id,
    title,
    description,
    price_from,
    price_to,
    is_new,
    body_type,
    mileage,
    engine,
    transmittion,
    wheel_drive,
    color,
    model,
    year_from,
    year_to,
    applications: [],
    created_at: new Date()
  })

  return res.status(201).json(order)
}

module.exports = addNewOrder
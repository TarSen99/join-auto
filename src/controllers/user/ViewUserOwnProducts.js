const User = require('@/models/User.js')
const Vehicle = require('@/models/Vehicle.js')
const { PaginationWrapper, PaginationFormatter } = require('@/helpers/Pagination.js')
const Mongoose = require('mongoose')

/**
 * @api {get} /user/products/own ViewUserOwnProducts
 * @apiName ViewUserOwnProducts
 * @apiGroup User
 * @apiDescription Api only for private user profile view
 * @apiHeader {String} Authorization
 *
 */
const ViewUserOwnProducts = async (req, res) => {
  const { current_user_id } = req.body

  const {
    page = 1,
    limit = 20
  } = req.query

  const count = await Vehicle.countDocuments({ user_owner: current_user_id })

  const pagination = new PaginationWrapper()
    .setPage(page)
    .setLimit(limit)
    .setCount(count)
    .build()

  const products = await Vehicle.find({ user_owner: current_user_id})
    .sort({created_at: -1 })
    .skip(pagination.getSkippedItemsCount())
    .limit(pagination.getPerPage())

  return res.status(200).json({
    products,
    pagination: new PaginationFormatter(pagination)
  })
}

module.exports = ViewUserOwnProducts
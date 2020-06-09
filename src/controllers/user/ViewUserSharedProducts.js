const User = require('@/models/User.js')
const Vehicle = require('@/models/Vehicle.js')
const { PaginationWrapper, PaginationFormatter } = require('@/helpers/Pagination.js')
const Mongoose = require('mongoose')

/**
 * @api {get} /user/products/shared ViewUserSharedProducts
 * @apiName ViewUserSharedProducts
 * @apiGroup User
 * @apiDescription Api only for private user profile view
 * @apiHeader {String} Authorization
 *
 */
const ViewUserSharedProducts = async (req, res) => {
  const { current_user_id } = req.body

  const {
    page = 1,
    limit = 20
  } = req.query

  const concatItemsRequestSchema = [
    {
      $match: { _id: Mongoose.Types.ObjectId(current_user_id) },
    },
    {
      $group: { _id: '$shared_products' }
    },
    {
      $unwind: '$_id'
    },
    {
      $lookup: { from: 'vehicles', localField: '_id', foreignField: '_id', as: 'product' }
    },
    {
      $group: { _id: '$product' }
    },
    {
      $unwind: '$_id'
    },
    {
      $replaceRoot: { newRoot: '$_id' }
    }
  ]

  const productsCount = await User.aggregate([
    ...concatItemsRequestSchema,
    { $count: 'count' }
  ]).then(value => {
    return value[0] && value[0].count
  })

  const pagination = new PaginationWrapper()
    .setPage(page)
    .setLimit(limit)
    .setCount(productsCount || 0)
    .build()

  const products = await User.aggregate([
    ...concatItemsRequestSchema,
    {
      $sort: { created_at: -1 },
    },
    {
      $skip: pagination.getSkippedItemsCount(),
    },
    {
      $limit: pagination.getPerPage()
    }
  ])

  return res.status(200).json({
    products,
    pagination: new PaginationFormatter(pagination)
  })
}

module.exports = ViewUserSharedProducts
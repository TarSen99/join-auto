const User = require('@/models/User.js')
const Vehicle = require('@/models/Vehicle.js')
const { PaginationWrapper, PaginationFormatter } = require('@/helpers/Pagination.js')
const Mongoose = require('mongoose')

/**
 * @api {get} /user/products/:id ViewUserProducts
 * @apiName ViewUserProducts
 * @apiGroup User
 *
 * @apiParam {id} user_id
 *
 */
const ViewUserProducts = async (req, res) => {
  const { id } = req.params

  const {
    page = 1,
    limit = 20
  } = req.query

  const concatItemsRequestSchema = [
      {
        $match: { _id: Mongoose.Types.ObjectId(id) },
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
      },
      {
        $group: { _id: Mongoose.Types.ObjectId(id), shared_products: { $push: '$$ROOT' } }
      },
      {
        $lookup: { from: 'vehicles', localField: '_id', foreignField: 'user_owner_id', as: 'own_products' }
      },
      {
        $project: { items: { $concatArrays: ['$shared_products', '$own_products'] }, _id: 0 }
      },
      {
        $unwind: '$items'
      },
      {
        $replaceRoot: { newRoot: '$items' }
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
    },
    {
      $project: { buy_requests: 0, is_sold_with_user_id: 0}
    }
  ])

  return res.status(200).json({
    products,
    pagination: new PaginationFormatter(pagination)
  })
}

module.exports = ViewUserProducts
const Order = require('@/models/Order.js')
const Mongoose = require('mongoose')

const SortWrapper = require('@/helpers/Sort.js')
const filterNulls = require('@/helpers/filterFromUndefined.js')
const { PaginationWrapper, PaginationFormatter } = require('@/helpers/Pagination.js')

/**
 * @api {get} /order/applications/:id viewOrderApplications
 * @apiName viewOrderApplications
 * @apiGroup Order
 *
 * @apiParam {String} id
 * @apiDescription additional queries ?page=1&limit=20
 * Where page is curr page and limit is items per page
 */

const viewOrderApplications = async (req, res) => {
  const {
    id,
  } = req.params

  const {
    page = 1,
    limit = 20
  } = req.query


  //find by id
  //get just applications field
  //split this field on documents (each value of array will become separate doc)
  //count that documents and write it to field value
  const count = await Order.aggregate([
    { $match: { _id: Mongoose.Types.ObjectId(id) } },
    { $group: { _id: '$applications' } },
    { $unwind: '$_id' },
    { $count: 'value' },
    { $project: {value: '$value'}}
  ]).then(count => count[0] && count[0].value)

  const pagination = new PaginationWrapper()
    .setPage(page)
    .setLimit(limit)
    .setCount(count || 0)
    .build()
  
  const applications = await Order.findById(id)
    .populate({
      path: 'applications',
      populate: { path: 'applications' },
      options: {
        sort: { created_at: -1 },
        skip: pagination.getSkippedItemsCount(),
        limit: pagination.getPerPage()
      }
    }).then(order => order.applications)

  

  // const applications = await Order.aggregate([
  //   { $match: { _id: Mongoose.Types.ObjectId(id) } },
  //   { $sort: { 'applications.created_at': -1 } },
  //   { $group: { _id: '$applications' } },
  //   { $unwind: '$_id' },
  //   { $skip: pagination.getSkippedItemsCount() },
  //   { $limit: pagination.getPerPage() },
  // ]
  // )

  if (!applications) {
    return res.status(404).json({
      error: 'Applications not found'
    })
  }

  return res.status(200).json({
    applications,
    pagination: new PaginationFormatter(pagination)
  })
}

module.exports = viewOrderApplications
const Order = require('@/models/Order.js')
const SortWrapper = require('@/helpers/Sort.js')
const filterNulls = require('@/helpers/filterFromUndefined.js')
const { PaginationWrapper, PaginationFormatter } = require('@/helpers/Pagination.js')
const { MAX_PRICE_VALUE } = require('@/constants.js')
/**
 * @api {get} /order/list getOrders
 * @apiName getOrders
 * @apiGroup Order
 *
 *
 * @apiParam {Number} price_from 
 * @apiParam {Number} price_to
 * @apiParam {Number} is_new 0 or 1
 * @apiParam {Number} is_sold  0 or 1
 * @apiParam {Number} body_type
 * @apiParam {Number} mileage
 * @apiParam {Number} engine
 * @apiParam {Number} transmittion
 * @apiParam {Number} wheel_drive
 * @apiParam {Number} color
 * @apiParam {String} sort default='created_at'
 * @apiParam {Number} order 1 or -1. Default is -1 (From greater to less)
 * @apiParam {Number} page default is 1
 * @apiParam {Number} limit default is 20. Products per page
 */

module.exports = async (req, res) => {
  let {
    price_from = 0,
    price_to,
    year_from = 0,
    year_to,
    mileage,
    engine,
    transmittion,
    wheel_drive,
    color,
    sort = 'created_at',
    is_new,
    model,
    brand,
    order = -1,
    page = 1,
    limit = 20
  } = req.query

  const AVAILABLE_SORT_TYPES = ['price_from', 'price_to', 'mileage', 'created_at', 'year_from', 'year_to']
  const DEFAULT_SORT_FIELD = 'created_at'

  const sortOptions = new SortWrapper()
    .setType(sort)
    .setOkTypes(AVAILABLE_SORT_TYPES)
    .setDefault(DEFAULT_SORT_FIELD)
    .setOrder(order)
    .build()

  price_from = price_from ? +(price_from.trim()) : 0
  price_to = price_to ? +(price_to.trim()) : null

  year_from = year_from ? +(year_from.trim()) : 0
  year_to = year_to ? +(year_to.trim()) : null

  let newPriceTo;
  let newYearTo;

  if (!price_to) {
    newPriceTo = MAX_PRICE_VALUE
  }

  if (!year_to) {
    newYearTo = new Date().getFullYear()
  }

  const findModel = filterNulls({
    price_from: { $gte: price_from },
    price_to: { $lte: newPriceTo },
    year_from: { $gte: year_from },
    year_to: { $lte: newPriceTo },
    is_new,
    mileage,
    engine,
    transmittion,
    wheel_drive,
    color,
    model,
    brand
  });

  const count = await Order.countDocuments(findModel)

  const pagination = new PaginationWrapper()
    .setPage(page)
    .setLimit(limit)
    .setCount(count)
    .build()

  const items = await Order.find(findModel)
    .sort({ [sortOptions.getFieldName()]: sortOptions.getOrder() })
    .skip(pagination.getSkippedItemsCount())
    .limit(pagination.getPerPage())

  return res.status(200).json({
    count,
    pagination: new PaginationFormatter(pagination),
    items
  })
}

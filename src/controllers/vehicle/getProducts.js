const Vehicle = require('@/models/Vehicle.js')
const SortWrapper = require('@/helpers/Sort.js')
const filterNulls = require('@/helpers/filterFromUndefined.js')
const { PaginationWrapper, PaginationFormatter } = require('@/helpers/Pagination.js')

/**
 * @api {get} /products getProducts
 * @apiName getProducts
 * @apiGroup Product
 *
 *
 * @apiParam {Number} price_from 
 * @apiParam {Number} price_to
 * @apiParam {Number} is_new 0 or 1
 * @apiParam {Number} vehicle_type
 * @apiParam {Number} available_for_promote 0 or 1
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
    is_new,
    vehicle_type,
    available_for_promote,
    is_sold,
    body_type,
    mileage,
    engine,
    transmittion,
    wheel_drive,
    color,
    sort = 'created_at',
    order = -1,
    page = 1,
    limit = 20
  } = req.query

  const AVAILABLE_SORT_TYPES = ['price', 'mileage', 'created_at']
  const DEFAULT_SORT_FIELD = 'created_at'

  const sortOptions = new SortWrapper()
    .setType(sort)
    .setOkTypes(AVAILABLE_SORT_TYPES)
    .setDefault(DEFAULT_SORT_FIELD)
    .setOrder(order)
    .build()

  price_from = price_from ? +(price_from.trim()) : 0
  price_to = price_to ? +(price_to.trim()) : null
  let newPriceTo;

  if (!price_to) {
    newPriceTo = await new Promise((res, rej) => {
      Vehicle
        .find({})
        .select('price')
        .sort({ "price": -1 })
        .limit(1)
        .exec(function (err, doc) {
          if (err) rej(err)

          res(doc[0].price)
        });
    })
  }


  const findModel = filterNulls({
    price: { $lte: newPriceTo || price_to, $gte: price_from },
    is_new,
    vehicle_type,
    available_for_promote,
    is_sold,
    body_type,
    mileage,
    engine,
    transmittion,
    wheel_drive,
    color
  });

  const count = await Vehicle.countDocuments(findModel)

  const pagination = new PaginationWrapper()
    .setPage(page)
    .setLimit(limit)
    .setCount(count)
    .build()

  const items = await Vehicle.find(findModel)
    .sort({ [sortOptions.getFieldName()]: sortOptions.getOrder() })
    .skip(pagination.getSkippedItemsCount())
    .limit(pagination.getPerPage())

  return res.status(200).json({
    count,
    pagination: new PaginationFormatter(pagination),
    items
  })
}

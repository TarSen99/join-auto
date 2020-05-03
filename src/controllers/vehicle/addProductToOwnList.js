const Vehicle = require('@/models/Vehicle.js')
const User = require('@/models/User.js')
const { USER_BASE_INFO_FIELDS } = require('@/constants.js')

/**
 * @api {post} /product/add addProductToOwnList 
 * @apiDescription Add foreigh product to own list
 * @apiName addProductToOwnList
 * @apiGroup Product
 *
 * @apiHeader {String} Authorization
 *
 * @apiParam {String} product_id id of product
 */

const addProductToOwnList = async (req, res) => {
  const {
    current_user_id,
    product_id
  } = req.body

  const product = await Vehicle.findOne({ _id: product_id})
    .populate({ path: 'user_owner', select: USER_BASE_INFO_FIELDS})

  if (!product) {
    return res.status(404).json({
      error: 'Product not found'
    })
  }
  
  if (product.user_owner._id.equals(current_user_id)) {
    return res.status(403).json({
      error: 'Product already added'
    })
  }

  const user = await User.findById(current_user_id)

  const shared_products = user.shared_products || []

  const productAreadyShared = shared_products.find(product => product._id.equals(product_id))

  if (productAreadyShared) {
    return res.status(403).json({
      error: 'Product already added'
    })
  }

  shared_products.push(product)
  user.shared_products = shared_products;

  user.save()
  
  return res.status(200).json(product)
}

module.exports = addProductToOwnList
const Vehicle = require('@/models/Vehicle.js')
const User = require('@/models/User.js')
const { USER_BASE_INFO_FIELDS } = require('@/constants.js')

/**
 * @api {delete} /product/:id removeProductToOwnList 
 * @apiDescription Delete product from own list.
 *  If owner of product call this api,
 * the product will be removed totally!
 * @apiName removeProductToOwnList
 * @apiGroup Product
 *
 * @apiHeader {String} Authorization
 *
 * @apiParam {id} product_id id of product
 */

const removeProductToOwnList = async (req, res) => {
  const {
    current_user_id,
  } = req.body

  const { id: product_id} = req.params

  const product = await Vehicle.findOne({ _id: product_id })
    .populate({ path: 'user_owner', select: USER_BASE_INFO_FIELDS })
  
  if (!product) {
    return res.status(404).json({
      error: 'Product not found'
    })
  }

  if (product.user_owner._id.equals(current_user_id)) {
    await product.delete()

    return res.status(200).json()
  }

  const user = await User.findById(current_user_id)

  const shared_products = user.shared_products || []

  const productAreadySharedIndex = shared_products.findIndex(product => product._id.equals(product_id))

  if (productAreadySharedIndex === -1) {
    return res.status(404).json({
      error: 'Product not found'
    })
  }

  shared_products.splice(productAreadySharedIndex, 1)
  user.shared_products = shared_products;

  user.save()

  return res.status(200).json()
}

module.exports = removeProductToOwnList
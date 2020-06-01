const User = require('@/models/User')
const Vehicle = require('@/models/Vehicle.js')
const USER_BASE_INFO_FIELDS = 'email user_name phone_number _id location'

/**
 * @api {post} /product/buy buyAuto
 * @apiName buyAuto
 * @apiGroup Product
 *
 * @apiHeader {String} Authorization
 * 
 * @apiParam {String} product_id id of product
 * @apiParam {String} comment id of product
 * @apiParam {Number} price price you want buy for
 */

const buyAuto = async (req, res) => {
  let {
    current_user_id,
    product_id,
    comment,
    price
  } = req.body
  product_id = product_id.trim()
  comment = comment.trim()
  const vehicle = await Vehicle.findOne({ _id: product_id })
    .populate({ path: 'user_owner', select: USER_BASE_INFO_FIELDS })
  
  const { _id } = vehicle.user_owner
  const ownerVehicleId = _id.toString().trim()

  const { buy_requests } = vehicle._doc

  if (current_user_id === ownerVehicleId) {
    return res.status(403).json({
      error: `Couldn't buy own product.` 
    })
  }

  const alreadyApproved = buy_requests.find(item => {
    return item.approved
  })

  if (alreadyApproved) {
    return res.status(403).json({
      error: 'Product already approved'
    })
  }

  const existingRequest = buy_requests.find(item => {
    return item.user_id.toString() === current_user_id
  })

  if (existingRequest) {
    const now = new Date()

    existingRequest.price = price
    existingRequest.approved = null
    existingRequest.updated_at = now
    existingRequest.comment = comment

    await vehicle.save()

    return res.status(200).json({
      approved: false,
      updated_at: now
    })
  }

  const currentUser = await User.findById(current_user_id)

  buy_requests.push({
    user_id: current_user_id,
    comment,
    approved: null,
    created_at: new Date(),
    updated_at: null,
    price,
    user_name: currentUser.user_name
  })

  await vehicle.save()

  return res.status(201).json({
    approved: false
  })
}

module.exports = buyAuto
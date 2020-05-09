const User = require('@/models/User.js')
const Vehicle = require('@/models/Vehicle.js')
const { USER_BASE_INFO_FIELDS } = require('@/constants.js')
const filterNulls = require('@/helpers/filterFromUndefined.js')

/**
 * @api {post} /user/rate RateUser
 * @apiName RateUser
 * @apiGroup User
 *
 * @apiHeader {String} Authorization
 * 
 * @apiParam {Number} rate 1-5
 *
 */
const rateUser = async (req, res) => {
  const {
    current_user_id,
    user_id,
    rate
  } = req.body
  const userToRate = await User.findById(user_id)

  if (!userToRate) {
    return res.status(404).json({
      error: 'Not found'
    })
  }

  if (userToRate._id.equals(current_user_id)) {
    return res.status(403).json({
      error: 'Error'
    })
  }

  let canRate = true
  const userToRateProducts = await Vehicle.find({ user_owner: userToRate._id, is_sold: true})
  
  const productToRate = userToRateProducts.find(product => product && product.is_sold_with_user_id && product.is_sold_with_user_id.equals(current_user_id))
  const userBoughtProduct = userToRateProducts.find(product => product && product.is_sold_to &&  product.is_sold_to.equals(current_user_id))

  if (!productToRate && !userBoughtProduct) {
    canRate = false
  }

  if (!canRate) {
    return res.status(403).json({
      error: 'You can not rate this user'
    })
  }

  const existingRate = (userToRate.rate_array || []).find(rate => rate.from_user.equals(current_user_id)) 

  if (existingRate) {
    return res.status(403).json({
      error: 'You\'ve already rated this user'
    })
  }

  userToRate.rate_array.push({
    from_user: current_user_id,
    value: rate,
    created_at: new Date()
  })
  userToRate.rating = userToRate.rate_array.reduce((prev, curr) => {
    return prev + curr.value
  }, 0) / userToRate.rate_array.length

  await userToRate.save()

  return res.status(200).json(userToRate)
}

module.exports = rateUser
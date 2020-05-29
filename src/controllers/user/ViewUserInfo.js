const User = require('@/models/User.js')
const { USER_BASE_INFO_FIELDS } = require('@/constants.js')
var Mongoose = require('mongoose');
const Vehicle = require('@/models/Vehicle.js')

/**
 * @api {get} /user/:id ViewUserInfo
 * @apiName ViewUserInfo
 * @apiGroup User
 *
 * @apiParam {id} user_id
 *
 */
const ViewUserInfo = async (req, res) => {
  const { id } = req.params
  const { current_user_id = null } = req.body

  const user = await User.findById(id, USER_BASE_INFO_FIELDS)

  if (!user) {
    return res.status(404).json({
      error: 'Not found'
    })
  }

  let canRate = true;
    
  const userAlreadyRated = (user.rate_array || []).find(rate => rate.from_user === Mongoose.Types.ObjectId(current_user_id))
  const userToRateProducts = await Vehicle.find({ user_owner: user._id, is_sold: true })

  const userHelpedToSell = userToRateProducts.find(product => {
    return product && product.is_sold_with_user_id && product.is_sold_with_user_id.equals(current_user_id)
  })
  const userBoughtProduct = userToRateProducts.find(product => {
    return product && product.is_sold_to && product.is_sold_to.equals(current_user_id)
  })

  if ((!userHelpedToSell && !userBoughtProduct) || userAlreadyRated) {
    canRate = false
  }

  return res.status(200).json({...user._doc, can_rate: canRate || false})
}

module.exports = ViewUserInfo
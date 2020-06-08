const User = require('@/models/User.js')
var Mongoose = require('mongoose');
const Vehicle = require('@/models/Vehicle.js')

const MAX_HISTORY_LENGTH = 50

module.exports = async (req, res, next) => {
  const {
    current_user_id 
  } = req.body
  const { id : product_id} = req.params
  const { q = null } = req.query
  
  const vehicle = await Vehicle.findById(product_id)
  .populate('user_owner')

  if (!vehicle) {
    return res.status(404).json({
      id: 'Product not found'
    })
  }

  req.body.vehicle = vehicle

  const user = await User.findById(current_user_id)

  if (!user) {
   next()
  }

  if (!q) {
    next()

    return
  }
  
  const productAlreadyInHistory = user.views_history.find(product => {
    return product.product_id && product.product_id.equals(product_id)
  })

  if (productAlreadyInHistory) {
    next()

    return
  }

  if (user.views_history.length < MAX_HISTORY_LENGTH) {
    user.views_history.push({
      product_id: Mongoose.Types.ObjectId(product_id),
      token: q,
      created_at: new Date()
    })

    await user.save()

    next()

    return
  }

  await sortedViewsByDate.splice(0, 1, {
    product_id: Mongoose.Types.ObjectId(product_id),
    token: q,
    created_at: new Date()
  })

  user.views_history.shift()
  user.views_history.push({
    product_id: Mongoose.Types.ObjectId(product_id),
    token: q,
    created_at: new Date()
  })

  user.save()

  next()
}
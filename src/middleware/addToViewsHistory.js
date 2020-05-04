const jwt = require('jsonwebtoken')
const config = require('@/config')
const User = require('@/models/User.js')
var Mongoose = require('mongoose');

const MAX_HISTORY_LENGTH = 50

module.exports = async (req, res, next) => {
  const {
    current_user_id 
  } = req.body
  const { id : product_id} = req.params
  const {q = null} = req.query
  const user = await User.findById(current_user_id)

  if (!user) {
    return res.status(403).json({
      error: 'Unexpected error'
    })
  }

  if (!q) {
    next()
  }
  
  const productAlreadyInHistory = user.views_history.find(product => {
    product.id === Mongoose.Types.ObjectId(product_id)
  })

  if (productAlreadyInHistory) {
    next()
  }

  if (user.views_history.length < MAX_HISTORY_LENGTH) {
    user.views_history.push({
      product: Mongoose.Types.ObjectId(product_id),
      token: q,
      created_at: new Date()
    })

    await user.save()

    next()
  }

  const sortedViews = await User.aggregate([
    {
      $match: { _id: Mongoose.Types.ObjectId(current_user_id)}
    },
    {
      $sort: { 'views_history.created_at': 1}
    }
  ])

  return res.status(200).json(sortedViews)

  next()
}
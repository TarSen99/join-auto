const yup = require('yup')
const Mongoose = require('mongoose')

const ViewOrderSchema = yup.object().shape({
  order_id: yup.string().required(),
})

module.exports = async (req, res, next) => {
  const {
    order_id
  } = req.body

  if (!Mongoose.Types.ObjectId.isValid(order_id)) {
    return res.status(404).json({
      'id': 'Order not found'
    })
  }

  try {
    await ViewOrderSchema.validate({
      order_id
    }, {
    })

    next()
  } catch (err) {
    return res.status(422).json({
      [err.path]: err.message
    })
  }
}
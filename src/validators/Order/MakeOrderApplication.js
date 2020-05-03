const yup = require('yup')
const Mongoose = require('mongoose')

const ViewOrderSchema = yup.object().shape({
  id: yup.string().required(),
  message: yup.string(),
  date_complete_to: yup.date(),
  price: yup.number(),
})

module.exports = async (req, res, next) => {
  const {
    message,
    price,
    date_complete_to,
    id,
  } = req.params

  if (!Mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      'id': 'Order not found'
    })
  }

  try {
    await ViewOrderSchema.validate({
      id,
      price,
      date_complete_to,
      message
    }, {
    })

    next()
  } catch (err) {
    return res.status(422).json({
      [err.path]: err.message
    })
  }
}
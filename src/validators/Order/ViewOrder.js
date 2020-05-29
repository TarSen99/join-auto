const yup = require('yup')
const Mongoose = require('mongoose')

const ViewOrderSchema = yup.object().shape({
  id: yup.string().required(),
})

module.exports = async (req, res, next) => {
  const {
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
    }, {
        abortEarly: false
    })

    next()
  } catch (err) {
    next({ ...err, yupError: true })
  }
}
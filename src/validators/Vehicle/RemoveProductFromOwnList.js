const yup = require('yup')
const bcrypt = require('bcrypt')
const Mongoose = require('mongoose')

const BuyAutoSchema = yup.object().shape({
  id: yup.string().required(),
})

module.exports = async (req, res, next) => {
    const {
      id,
    } = req.params

    try {
      await BuyAutoSchema.validate({
        id
      }, {
          abortEarly: false
    })

    if (!Mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        'product': 'Product not found'
      })
    }

    next()
  } catch (err) {
      next({ ...err, yupError: true })
  }
}
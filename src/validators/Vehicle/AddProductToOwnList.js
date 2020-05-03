const yup = require('yup')
const bcrypt = require('bcrypt')
const Mongoose = require('mongoose')

const BuyAutoSchema = yup.object().shape({
  product_id: yup.string().required(),
})

module.exports = async (req, res, next) => {
  const { product_id } = req.body

  try {
    await BuyAutoSchema.validate({
      product_id
    }, {
    })


    if (!Mongoose.Types.ObjectId.isValid(product_id)) {
      return res.status(404).json({
        'product': 'Product not found'
      })
    }

    next()
  } catch (err) {
    return res.status(422).json({
      [err.path]: err.message
    })
  }
}
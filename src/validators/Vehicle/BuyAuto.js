const yup = require('yup')
const bcrypt = require('bcrypt')

const BuyAutoSchema = yup.object().shape({
  product_id: yup.string().required(),
  comment: yup.string().required(),
  price: yup.number().required(),
})

module.exports = async (req, res, next) => {
  const { product_id, comment, price } = req.body

  try {
    await BuyAutoSchema.validate({
      product_id,
      comment,
      price
    }, {
    })

    next()
  } catch (err) {
    return res.status(422).json({
      [err.path]: err.message
    })
  }
}
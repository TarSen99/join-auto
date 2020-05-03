const yup = require('yup')
const bcrypt = require('bcrypt')

const HandleBuyRequestSchema = yup.object().shape({
  product_id: yup.string().required(),
  request_id: yup.string().required(),
})

module.exports = async (req, res, next) => {
  const { product_id, request_id } = req.body

  try {
    await HandleBuyRequestSchema.validate({
      product_id,
      request_id
    }, {
    })

    next()
  } catch (err) {
    return res.status(422).json({
      [err.path]: err.message
    })
  }
}
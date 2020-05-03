const yup = require('yup')
const bcrypt = require('bcrypt')

const ResetPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
})

module.exports = async (req, res, next) => {
  const { email } = req.body

  try {
    await ResetPasswordSchema.validate({
      email,
    }, {
    })

    next()
  } catch (err) {
    return res.status(422).json({
      [err.path]: err.message
    })
  }
}
const yup = require('yup')
const bcrypt = require('bcrypt')

const ResetPasswordSchema = yup.object().shape({
  token: yup.string().required(),
  password: yup.string().required().min(6),
})

module.exports = async (req, res, next) => {
  const { token, password } = req.body

  try {
    await ResetPasswordSchema.validate({
      token,
      password
    }, {
        abortEarly: false
    })

    next()
  } catch (err) {
    next({ ...err, yupError: true })
  }
}
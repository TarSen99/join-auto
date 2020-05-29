const yup = require('yup')
const bcrypt = require('bcrypt')

const RegisterSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})

module.exports = async (req, res, next) => {
  const { email, password } = req.body

  try {
    await RegisterSchema.validate({
      email,
      password
    }, {
        abortEarly: false
    })

    next()
  } catch (err) {
    next({ ...err, yupError: true })
  }
}
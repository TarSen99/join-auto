const yup = require('yup')
const bcrypt = require('bcrypt')
const UserModel = require('@/models/User.js')

const RegisterSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})

module.exports = async (req, res, next) => {
  const { email, password } = req.body
  console.log(2222)

  try {
    await RegisterSchema.validate({
      email,
      password
    }, {
    })

    const existingUser = await UserModel.findOne({ email })

    if (!existingUser) {
      throw new yup.ValidationError(
        'Please check your credentials',
        req.body,
        'email'
      )
    }

    const passwordMatch = await bcrypt.compare(password, existingUser._doc.password);

    if (!passwordMatch) {
      throw new yup.ValidationError(
        'Please check your credentials',
        req.body,
        'email'
      )
    }

    next()
  } catch (err) {
    return res.status(400).json({
      [err.path]: err.message
    })
  }
}
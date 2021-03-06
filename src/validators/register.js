const yup = require('yup')
const UserModel = require('@/models/User.js')

const RegisterSchema = yup.object().shape({
  user_name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  phone_number: yup.string().required(),
  location: yup.string().required(),
})

module.exports = async (req, res, next) => {
  const { user_name, email, password, phone_number, location } = req.body

  try {
    await RegisterSchema.validate({
      user_name,
      email,
      password,
      phone_number,
      location
    }, {
        abortEarly: false
    })

    const existingUser = await UserModel.findOne({ email })
    
    if (existingUser) {
      throw new yup.ValidationError(
        'This user already exist',
        { ...req.body, yupError: true },
        'email'
      )
    }

    next()
  } catch (err) {
    next({...err, yupError: true})
  }
}
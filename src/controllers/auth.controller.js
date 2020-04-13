const User = require('@/models/User')
const qs = require('qs')

const getUserInfo = (user) => {
  const userParsed = qs.parse(user)

  const newObj = userParsed._doc
  
  delete newObj.is_admin
  delete newObj.email_code
  delete newObj.__v

  return newObj
}

const login = async (req, res) => {
  const { email, password } = req.body
  
  const user = await User.findOne({ email })  
  const token = user.generateToken()
  const userDetails = getUserInfo(user)


  return res.status(200).json({
    ...userDetails,
    auth_token: token
  })
}

  // email: String,
  // user_name: String,
  // password: String,
  // created_at: Date,
  // updated_at: Date,
  // phone_number: String,
  // location: String,
  // rating: Number,
  // is_admin: Boolean 

const register = async (req, res) => {  
  const { email, user_name, password, phone_number, location} = req.body

  const user = await User.create({
      email,
      user_name,
      password,
      phone_number,
      location,
      is_admin: false
  })

  const token = user.generateToken()

  const userDetails = getUserInfo(user)
  
  return res.status(201).json({
    ...userDetails,
    auth_token: token
  })
}

module.exports = {
  login,
  register
}
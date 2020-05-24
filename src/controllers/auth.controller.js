const User = require('@/models/User')
const ResetPassword = require('@/models/ResetPassword')
const qs = require('qs')
const yup = require('yup')
const bcrypt = require('bcrypt')

const getUserInfo = (user) => {
  const userParsed = qs.parse(user)

  const newObj = userParsed._doc
  
  delete newObj.is_admin
  delete newObj.email_code
  delete newObj.__v

  return newObj
}

/**
 * @api {post} /login Login
 * @apiName Login
 * @apiGroup Auth
 * 
 * @apiParam {String} email
 * @apiParam {String} password
 * @apiSuccessExample {json} Success-Response:
 *  { "auth_token": "token_goes_here" }
 *  Save this to local storage and add to each request as Authorization header
 */
const login = async (req, res) => {
  const { email, password } = req.body
    
  const existingUser = await User.findOne({ email })

  if (!existingUser) {
    throw new yup.ValidationError(
      'Check your credentials.',
      { ...req.body, yupError: true },
      'email'
    )
  }
  const passwordMatch = await bcrypt.compare(password, existingUser._doc.password);

  if (!passwordMatch) {
    throw new yup.ValidationError(
      'Check your credentials.',
      { ...req.body, yupError: true},
      'email'
    )
  }

  const token = existingUser.generateToken()
  const userDetails = getUserInfo(existingUser)


  return res.status(200).json({
    ...userDetails,
    auth_token: token
  })
}

/**
 * @api {post} /sign-up Register
 * @apiName Register
 * @apiGroup Auth
 *
 * @apiParam {String} email
 * @apiParam {String} user_name
 * @apiParam {String} password
 * @apiParam {String} phone_number
 * @apiParam {String} location
 * @apiSuccessExample {json} Success-Response:
 *  { "auth_token": "token_goes_here" }
 *  Save this to local storage and add to each request as Authorization header
 */

const sendResetEmail = () => {

}

const register = async (req, res) => {  
  const { email, user_name, password, phone_number, location} = req.body

  const user = await User.create({
      email,
      user_name,
      password,
      phone_number,
      location,
      is_admin: false,
      shared_products: [],
  })

  const token = user.generateToken()

  const userDetails = getUserInfo(user)
  
  
  return res.status(201).json({
    ...userDetails,
    auth_token: token
  })
}

/**
 * @api {post} /forgot-password Forgot password
 * @apiName Forgot password
 * @apiGroup Auth
 *
 * @apiParam {String} email
 * @apiSuccessExample {json} Success-Response:
 *  { "token": "token_goes_here" }
 *  Reset password token
 */

const forgotPassword = async (req, res) => {
  const { email } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(400).json({
      email: 'User doesn\'t exist'
    })  
  }

  const userDetails = user._doc

  const resetPasswordInstance = await ResetPassword.create({
    email: userDetails.email,
    created_at: new Date(),
    token: user.generateForgotPasswordToken()
  })

  sendResetEmail(resetPasswordInstance)

  return res.status(200).json(resetPasswordInstance._doc)
}

/**
 * @api {post} /reset-password Reset password
 * @apiName Reset password
 * @apiGroup Auth
 *
 * @apiParam {String} token
 * @apiParam {String} password
 */

const resetPassword = async (req, res) => {
  const { token, password } = req.body

  const resetPasswordInstance = await ResetPassword.findOne({ token })

  if (!resetPasswordInstance) {
    return res.status(422).json({
      password: 'token is invalid'
    })
  }

  const { email, created_at } = resetPasswordInstance._doc
  const now = new Date().getTime() 
  const createdAtPlusDay = created_at.getTime() + (1 * 24 * 60 * 60 * 1000)

  if (now > createdAtPlusDay) {
    await resetPasswordInstance.deleteOne()

    return res.status(422).json({
      password: 'token is expired'
    })
  }
  
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);

  const user = await User.findOneAndUpdate({
    email
  }, {
      password: bcrypt.hashSync(password, salt)
  })

  await resetPasswordInstance.deleteOne()

  return res.status(200).json(user._doc)
}

module.exports = {
  login,
  register,
  forgotPassword,
  resetPassword
}
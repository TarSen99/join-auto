const AUTH_HEADER_NAME = require('@/constants.js').AUTH_HEADER_NAME
const jwt = require('jsonwebtoken')
const config = require('@/config')

const checkToken = (token) => {
  try {
    jwt.verify(token, config.JWT_KEY);
    const currentUserId = jwt.decode(token, config.JWT_KEY)

    return currentUserId
  } catch (e) {
    return false
  }
}

module.exports = (req, res, next) => {
  const authToken = req.header(AUTH_HEADER_NAME)
  const userId = checkToken(authToken)

  if (!userId) {
    return res.status(401).json({})
  }

  req.token = authToken
  req.body.current_user_id = userId.id
  req.body_data = {}
  req.body_data.current_user_id = userId.id
  next()
}
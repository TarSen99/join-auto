const AUTH_HEADER_NAME = require('@/constants.js').AUTH_HEADER_NAME
const jwt = require('jsonwebtoken')
const config = require('@/config')

const checkToken = (token) => {
  try {
    jwt.verify(token, config.JWT_KEY);
    return true
  } catch (e) {
    return false
  }
}

module.exports = (req, res, next) => {
  const authToken = req.header(AUTH_HEADER_NAME)
  const valid = checkToken(authToken)

  if (!valid) {
    return res.status(401).json({})
  }

  next()
}
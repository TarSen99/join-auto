require('dotenv').config()

module.exports = {
  BD_BASE_URL: process.env.DB_URL,
  JWT_KEY: process.env.JWT_KEY,
}
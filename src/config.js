require('dotenv').config()

const BUCKET_NAME = 'join-auto'

module.exports = {
  BD_BASE_URL: process.env.DB_URL,
  JWT_KEY: process.env.JWT_KEY,
  IAM_ACCESS: process.env.IAM_ACCESS_KEY_ID,
  IAM_SECRET: process.env.IAM_SECRET_ACCESS_KEY,
  BUCKET_NAME: BUCKET_NAME
}
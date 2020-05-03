const yup = require('yup')
const Mongoose = require('mongoose')
const { MAX_PRICE_VALUE } = require('@/constants.js')

const RegisterSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  price_from: yup.number().required(),
  price_to: yup.number().default(MAX_PRICE_VALUE),
  vehicle_type: yup.number().required(),
  is_new: yup.boolean().required(),
  body_type: yup.number(),
  mileage: yup.number()
    .when('is_new', {
      is: false,
      then: yup.number().required(),
      otherwise: yup.number().notRequired()
    }),
  engine: yup.number().required(),
  transmittion: yup.number().required(),
  wheel_drive: yup.number().required(),
  color: yup.string().required(),
})

module.exports = async (req, res, next) => {
  const {
    title,
    description,
    price_from,
    price_to,
    is_new,
    vehicle_type,
    body_type,
    mileage,
    engine,
    transmittion,
    wheel_drive,
    color
  } = req.body

  try {
    await RegisterSchema.validate({
      title,
      description,
      price_from,
      price_to,
      is_new,
      vehicle_type,
      body_type,
      mileage,
      engine,
      transmittion,
      wheel_drive,
      color
    }, {
    })

    next()
  } catch (err) {
    return res.status(422).json({
      [err.path]: err.message
    })
  }
}
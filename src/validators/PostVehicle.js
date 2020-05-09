const yup = require('yup')
const Mongoose = require('mongoose')

const RegisterSchema = yup.object().shape({
  description: yup.string().required(),
  price: yup.number().required(),
  vehicle_type: yup.number().required(),
  available_for_promote: yup.boolean().default(false),
  promote_compensation: yup.number()
    .when('$available_for_promote', {
    is: true,
    then: yup.number().required(),
    otherwise: yup.number().notRequired(),
  }),
  promote_compensation_type: yup.number()
    .when('available_for_promote', {
      is: true,
      then: yup.number().required(),
      otherwise: yup.number().notRequired()
    }),
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
    description,
    price,
    is_new,
    vehicle_type,
    available_for_promote,
    promote_compensation,
    promote_compensation_type,
    is_sold,
    is_sold_with_user_id,
    body_type,
    mileage,
    engine,
    transmittion,
    wheel_drive,
    color
  } = req.body

  try {
    await RegisterSchema.validate({
      description,
      price,
      is_new,
      vehicle_type,
      available_for_promote,
      promote_compensation,
      promote_compensation_type,
      is_sold,
      is_sold_with_user_id,
      body_type,
      mileage,
      engine,
      transmittion,
      wheel_drive,
      color
    }, {
        abortEarly: false
    })

    next()
  } catch (err) {
    next({ ...err, yupError: true })
  }
}
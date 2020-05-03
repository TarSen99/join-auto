const yup = require('yup')

const Schema = yup.object().shape({
  price_from: yup.string().default('0'),
  is_new: yup.boolean().default(false),
  vehicle_type: yup.number(),
  available_for_promote: yup.number(),
  is_sold: yup.number(),
  body_type: yup.number(),
  mileage: yup.number(),
  engine: yup.number(),
  transmittion: yup.number(),
  wheel_drive: yup.number(),
  color: yup.number()
})

module.exports = async (req, res, next) => {
  const {
    price_from,
    price_to,
    is_new,
    vehicle_type,
    available_for_promote,
    is_sold,
    body_type,
    mileage,
    engine,
    transmittion,
    wheel_drive,
    color,
  } = req.query


  try {
    await Schema.validate({
      price_from,
      price_to,
      is_new,
      vehicle_type,
      available_for_promote,
      is_sold,
      body_type,
      mileage,
      engine,
      transmittion,
      wheel_drive,
      color,
    }, {
    })

    next()
  } catch (err) {
    return res.status(422).json({
      [err.path]: err.message
    })
  }
}
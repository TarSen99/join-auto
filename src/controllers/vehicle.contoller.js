const User = require('@/models/User')
const Vehicle = require('@/models/Vehicle.js')
const getProducts = require('@/controllers/vehicle/getProducts.js')
const buyAuto = require('@/controllers/vehicle/buyAuto.js')
const handleBuyRequst = require('@/controllers/vehicle/handleBuyRequst.js')
const qs = require('qs')
const s3 = require('@/services/aws.js')
/**
 * @api {post} /product/post postProduct
 * @apiName postProduct
 * @apiGroup Product
 *
 * @apiHeader {String} Authorization token
 * 
 * @apiParam {String} id user owner id
 * @apiParam {String} description
 * @apiParam {Number} price
 * @apiParam {Number} is_new 0 or 1
 * @apiParam {Number} vehicle_type
 * @apiParam {Number} available_for_promote  0 or 1
 * @apiParam {Number} promote_compensation_type
 * @apiParam {Number} body_type
 * @apiParam {Number} mileage
 * @apiParam {Number} engine
 * @apiParam {Number} transmittion
 * @apiParam {Number} wheel_drive
 * @apiParam {Number} color
 */

const postProduct = async (req, res) => {
  const {
    current_user_id,
  } = req.body

  const {
    description,
    price,
    is_new,
    vehicle_type,
    available_for_promote,
    promote_compensation,
    promote_compensation_type,
    body_type,
    mileage,
    engine,
    transmittion,
    wheel_drive,
    color,
  } = req.fields

  const imgsData = qs.parse(req.files)
  s3.upload(imgsData.images)
  // const { images } = req.files
  console.log(imgsData.images)

  return res.status(200).json()

  const userOwner = await User.findById(current_user_id)

  if (!userOwner) {
    return res.status(404).json({
      'email': 'User not found'
    })
  }

  const vehicle = await Vehicle.create({
    user_owner: current_user_id,
    description,
    price,
    is_new,
    vehicle_type,
    available_for_promote,
    promote_compensation,
    promote_compensation_type,
    is_sold: false,
    body_type,
    mileage,
    engine,
    transmittion,
    wheel_drive,
    color,
    created_at: new Date(),
  })

  return res.status(200).json(vehicle)
}

/**
 * @api {get} /products/:id getProductDetails
 * @apiName getProductDetails
 * @apiGroup Product
 *
 *
 * @apiParam {String} id id of product
 */

const getProductDetails = async (req, res) => {
  const { vehicle } = req.body

  return res.status(200).json(vehicle)
}


module.exports = {
  postProduct,
  getProductDetails,
  getProducts,
  buyAuto,
  handleBuyRequst
}
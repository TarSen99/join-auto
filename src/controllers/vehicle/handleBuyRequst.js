const Vehicle = require('@/models/Vehicle.js')
const { USER_BASE_INFO_FIELDS } = require('@/constants.js')

const handleBuyRequst = async (req, res) => {

  let {
    current_user_id,
    product_id,
    request_id,
    request_value
  } = req.body
  request_id = request_id.trim()
  product_id = product_id.trim()

  const vehicle = await Vehicle.findOne({ _id: product_id })
    .populate({ path: 'user_owner', select: USER_BASE_INFO_FIELDS })
  
  const productOwnerId = vehicle.user_owner._id.toString()
  
  if (productOwnerId !== current_user_id) {
    return res.status(403).json({
      error: 'Permission denied'
    })
  }

  const acceptedUserRequest = vehicle.buy_requests
    .find(item => item.approved)

  if (acceptedUserRequest && request_value) {
    return res.status(403).json({
      error: 'Buy request is already accepted'
    })
  }

  const declinedUserRequest = vehicle.buy_requests
    .find(item => item.approved === false)

  if (declinedUserRequest && !request_value) {
    return res.status(403).json({
      error: 'Buy request is already declined'
    })
  }

  const requestToAccept = vehicle.buy_requests.find(item => {
    return item._id.toString() === request_id
  })

  if (!requestToAccept) {
    return res.status(404).json({
      error: 'Request not found'
    })
  }

  requestToAccept.approved = request_value

  if (request_value) {
    requestToAccept.approved_at = new Date()
    requestToAccept.declined_at = null
  } else {
    requestToAccept.declined_at = new Date()
    requestToAccept.approved_at = null
  }

  await vehicle.save()

  return res.status(201).json(requestToAccept)
}

module.exports = handleBuyRequst
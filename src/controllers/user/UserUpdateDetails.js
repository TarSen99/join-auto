const User = require('@/models/User.js')
const { USER_BASE_INFO_FIELDS } = require('@/constants.js')
const filterNulls = require('@/helpers/filterFromUndefined.js')

/**
 * @api {put} /user/update updateUserInfo
 * @apiName updateUserInfo
 * @apiGroup User
 *
 * @apiHeader {String} Authorization
 * 
 * @apiParam {String} user_name
 * @apiParam {String} password
 * @apiParam {String} phone_number
 * @apiParam {String} location
 *
 */
const UserUpdateDetails = async (req, res) => {
  const { 
    current_user_id,
    phone_number,
    location,
    user_name
  } = req.body
  const user = await User.findById(current_user_id)

  if (!user) {
    return res.status(404).json({
      error: 'Not found'
    })
  }

  if (!user._id.equals(current_user_id)) {
    return res.status(401).json({
      error: 'Permission denied'
    })
  }

  const settingsToChange = filterNulls({
    phone_number,
    location,
    user_name
  })

  for (let propertyName in settingsToChange) {
    user[propertyName] = settingsToChange[propertyName]
  }
  
  await user.save()

  return res.status(200).json(user)
}

module.exports = UserUpdateDetails
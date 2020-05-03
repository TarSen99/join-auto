const User = require('@/models/User.js')

/**
 * @api {get} /user/my-profile ViewOwnProfile
 * @apiName ViewOwnProfile
 * @apiGroup User
 *
 * @apiHeader {String} Authorization
 *
 */
const ViewOwnProfile = async (req, res) => {
  const { current_user_id } = req.body

  const user = await User.findById(current_user_id, '-shared_products')

  if (!user) {
    return res.status(404).json({
      error: 'Not found'
    })
  }

  return res.status(200).json(user)
}

module.exports = ViewOwnProfile
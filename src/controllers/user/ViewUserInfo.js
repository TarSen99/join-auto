const User = require('@/models/User.js')
const { USER_BASE_INFO_FIELDS } = require('@/constants.js')
/**
 * @api {get} /user/:id ViewUserInfo
 * @apiName ViewUserInfo
 * @apiGroup User
 *
 * @apiParam {id} user_id
 *
 */
const ViewUserInfo = async (req, res) => {
  const { id } = req.params

  const user = await User.findById(id, USER_BASE_INFO_FIELDS)

  if (!user) {
    return res.status(404).json({
      error: 'Not found'
    })
  }

  return res.status(200).json(user)
}

module.exports = ViewUserInfo
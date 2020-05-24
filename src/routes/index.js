const Router = require('express-promise-router')

const v1Routes = require('./v1')
const router = new Router()

router.use('/v1', v1Routes)

module.exports = router;
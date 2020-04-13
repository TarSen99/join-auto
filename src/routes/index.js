const Router = require('express').Router

const v1Routes = require('./v1')
const router = new Router()

router.use('/v1', v1Routes)

module.exports = router;
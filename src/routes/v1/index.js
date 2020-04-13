var express = require('express');
var router = express.Router();
const Router = express.Router;

const authRouter = require('./auth_routes.js')

router.use(authRouter)

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Hello world')
  // res.render('index', { title: 'Express' });
});

module.exports = router;

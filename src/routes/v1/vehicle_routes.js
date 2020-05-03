const Router = require('express-promise-router')
const checkAuth = require('@/middleware/checkAuth.js')
const vehicleRouter = new Router()

const { postProduct, getProductDetails, getProducts, buyAuto, handleBuyRequst } = require('@/controllers/vehicle.contoller.js')
const approveBuyRequest = require('@/controllers/vehicle/approveBuyRequest.js')
const declineBuyRequest = require('@/controllers/vehicle/declineBuyRequest.js')
const addProductToOwnList = require('@/controllers/vehicle/addProductToOwnList.js')
const removeProductFromOwnList = require('@/controllers/vehicle/removeProductFromOwnList.js')

const PostVehicleValidator = require('@/validators/PostVehicle.js')
const GetVehicleValidator = require('@/validators/GetVehicle.js')
const GetVehicleListValidator = require('@/validators/GetVehicleList.js')
const BuyAutoValidator = require('@/validators/Vehicle/BuyAuto.js')
const HandleBuyRequestValidator = require('@/validators/Vehicle/HandleBuyRequest.js')
const AddProductToOwnListValidator = require('@/validators/Vehicle/AddProductToOwnList.js')
const RemoveProductFromOwnListValidator = require('@/validators/Vehicle/RemoveProductFromOwnList.js')

vehicleRouter.post('/product/post', checkAuth, PostVehicleValidator, postProduct)
vehicleRouter.get('/products/:id', GetVehicleValidator, getProductDetails)
vehicleRouter.get('/products', GetVehicleListValidator, getProducts)
vehicleRouter.post('/product/buy', checkAuth, BuyAutoValidator, buyAuto)
vehicleRouter.post('/product/approve', checkAuth, HandleBuyRequestValidator, approveBuyRequest, handleBuyRequst)
vehicleRouter.post('/product/decline', checkAuth, HandleBuyRequestValidator, declineBuyRequest, handleBuyRequst)
vehicleRouter.post('/product/add', checkAuth, AddProductToOwnListValidator, addProductToOwnList)
vehicleRouter.delete('/product/:id', checkAuth, RemoveProductFromOwnListValidator, removeProductFromOwnList)

module.exports = vehicleRouter
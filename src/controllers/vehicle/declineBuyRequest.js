/**
 * @api {post} /product/decline declineBuyRequst
 * @apiDescription  When someone wants to buy your product. 
 * You can even decline it when its already accepted
 * @apiName declineBuyRequst
 * @apiGroup Product
 *
 * @apiHeader {String} Authorization
 *
 * @apiParam {String} product_id id of product
 * @apiParam {String} request_id id of request
 */

const declineBuyRequst = async (req, res, next) => {
  req.body.request_value = false
  next()
}

module.exports = declineBuyRequst
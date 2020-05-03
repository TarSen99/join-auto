/**
 * @api {post} /product/approve approveBuyRequst 
 * @apiDescription When someone wants to buy your product
 * @apiName approveBuyRequst
 * @apiGroup Product
 *
 * @apiHeader {String} Authorization
 *
 * @apiParam {String} product_id id of product
 * @apiParam {String} request_id id of request
 */

const approveBuyRequst = async (req, res, next) => {
  req.body.request_value = true
  next()
}

module.exports = approveBuyRequst
"use strict";

var AUTH_HEADER_NAME = require("../constants.js").AUTH_HEADER_NAME;

var jwt = require('jsonwebtoken');

var config = require("../config");

var checkToken = function checkToken(token) {
  try {
    jwt.verify(token, config.JWT_KEY);
    var currentUserId = jwt.decode(token, config.JWT_KEY);
    return currentUserId;
  } catch (e) {
    return false;
  }
};

module.exports = function (req, res, next) {
  var authToken = req.header(AUTH_HEADER_NAME);
  var userId = checkToken(authToken);

  if (!userId) {
    return res.status(401).json({});
  }

  req.token = authToken;
  req.body.current_user_id = userId.id;
  next();
};
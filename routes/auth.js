/**
 * Routes for OAuth2
 *
 * Expose
 *  - get /oauth2/token
 *    Return all existing tokens
 *  - post /oauth2/token
 *    Create a new token for OAuth2 request
 */
var express = require('express');
var router = express.Router();

var authController = require('../controllers/auth');
var oauth2Controller = require('../controllers/oauth2');

// Create endpoint handlers for oauth2 token
router.route('/oauth2/token')
  .get(oauth2Controller.getTokens)
  .post(authController.isClientAuthenticated, oauth2Controller.token);

module.exports = router;
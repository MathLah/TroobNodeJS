var express = require('express');
var router = express.Router();

var clientController = require('../controllers/client');
var authController = require('../controllers/auth');

router.route('/')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);

module.exports = router;
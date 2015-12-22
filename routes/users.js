var express = require('express');
var router = express.Router();

var userController = require('../controllers/user');
var authController = require('../controllers/auth');

router.route('/')
    .get(authController.isBearerAuthenticated, userController.getUsers)
    .post(authController.isBearerAuthenticated, userController.postUser);

router.route('/:name')
    .get(authController.isBearerAuthenticated, userController.getUser)
    .put(authController.isBearerAuthenticated, userController.updateUser)
    .delete(authController.isBearerAuthenticated, userController.deleteUser);

//router.delete('/all', userController.deleteAllUsers);

module.exports = router;
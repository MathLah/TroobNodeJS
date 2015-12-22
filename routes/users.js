var express = require('express');
var router = express.Router();

var userController = require('../controllers/user');
var authController = require('../controllers/auth');

router.get('/', authController.isBearerAuthenticated, userController.getUsers);
router.get('/:name', authController.isBearerAuthenticated, userController.getUser);
router.post('/', authController.isBearerAuthenticated, userController.postUser);
router.put('/:name', authController.isBearerAuthenticated, userController.updateUser);
//router.delete('/all', userController.deleteAllUsers);
router.delete('/:name', authController.isBearerAuthenticated, userController.deleteUser);


module.exports = router;

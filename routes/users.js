var express = require('express');
var router = express.Router();

var userController = require('../controllers/user');

router.get('/', userController.getUsers);
router.get('/:name', userController.getUser);
router.post('/', userController.postUser);
router.put('/:name', userController.updateUser);
//router.delete('/all', userController.deleteAllUsers);
router.delete('/:name', userController.deleteUser);

module.exports = router;

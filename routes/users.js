var express = require('express');
var router = express.Router();

var userController = require('../controllers/user');

/* GET users listing. */
router.get('/', userController.getUsers);
router.post('/', userController.postUsers);
//router.delete('/all', userController.deleteAllUsers);
router.delete('/:name', userController.deleteUsers);

module.exports = router;

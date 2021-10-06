var express = require('express');
var router = express.Router();
const userController = require('../controller/userController.js')
/* GET users listing. */
router.get('/', userController.all);
router.post('/create',userController.create);
router.post('/login',userController.processToLogin);

module.exports = router;

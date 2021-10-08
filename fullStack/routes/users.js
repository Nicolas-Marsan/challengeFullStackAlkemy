var express = require('express');
var router = express.Router();
const userController = require('../controller/userController.js')
/* GET users listing. */

router.post('/create',userController.create);
router.post('/login',userController.processToLogin);
router.get('/logout',userController.logout);

module.exports = router;

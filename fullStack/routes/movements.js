var express = require('express');
var router = express.Router();
const movementsController = require('../controller/movementsController.js')
/* GET users listing. */

router.get('/movementsById',movementsController.movementsById);
router.post('/create',movementsController.create);


module.exports = router;
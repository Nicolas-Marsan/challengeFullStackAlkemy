var express = require('express');
var router = express.Router();
const movementsController = require('../controller/movementsController.js')
/* GET users listing. */

router.get('/movementsById',movementsController.movementsById);
router.get('/movementById',movementsController.movementById);
router.post('/create',movementsController.create);
router.post('/update',movementsController.update);
router.get('/delete',movementsController.delete);


module.exports = router;
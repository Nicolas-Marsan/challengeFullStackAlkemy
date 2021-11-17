var express = require("express");
var router = express.Router();
const movementsController = require("../controller/movementsController.js");
const verification = require ('../middleware/verification');
/* GET users listing. */

router.get("/movementsById",verification, movementsController.movements);
router.get("/movementById",verification, movementsController.movement);
router.post("/create",verification, movementsController.creation);
router.post("/update",verification, movementsController.upgrade);
router.get("/delete",verification, movementsController.destroy);

module.exports = router;

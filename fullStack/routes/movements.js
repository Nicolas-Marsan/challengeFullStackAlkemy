var express = require("express");
var router = express.Router();
const movementsController = require("../controller/movementsController.js");
const verification = require ('../middleware/verification');
/* GET users listing. */

router.get("/movementsById",verification, movementsController.movements);
router.get("/movementById",verification, movementsController.movement);
router.post("/create",verification, movementsController.creation);
router.post("/update",verification, movementsController.upgrade);
router.post("/movementsByCategory", movementsController.movementsCategory);
router.get("/delete",verification, movementsController.destroy);
router.get("/categories",verification, movementsController.categories);

module.exports = router;

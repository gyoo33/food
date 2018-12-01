const router = require("express").Router();
const ingredientController = require("../../controllers/ingredientController");
console.log("hello");
// Matches with "/api/ingredients"
router.route("/")
  .get(ingredientController.findAll)
  .post(ingredientController.create);

// Matches with "/api/ingredients/:id"
router
  .route("/:id")
  .get(ingredientController.findById)
  .put(ingredientController.update)
  .delete(ingredientController.remove);

module.exports = router; 
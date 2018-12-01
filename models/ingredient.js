const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  name: { type: String, required: true },
  Id: { type: String, required: true, unique: true }
});

const Ingredient = mongoose.model("Ingredient", IngredientSchema);

module.exports = Ingredient;

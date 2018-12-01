const db = require("../models");

// Defining methods for the ingredientController
module.exports = {
  findAll: function(req, res) {
    db.Ingredient.find(req.query)
      .then(dbIngredient => res.json(dbIngredient))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Ingredient.findById(req.params.id)
      .then(dbIngredient => res.json(dbIngredient))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log("hello");
    db.Ingredient.create(req.body)
      .then(dbIngredient => {
        res.json(dbIngredient)
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Ingredient.findOneAndUpdate({ id: req.params.id }, req.body)
      .then(dbIngredient => res.json(dbIngredient))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    console.log(req.params.id);
    db.Ingredient.findById(req.params.id)
      .then(dbIngredient => dbIngredient.remove())
      .then(dbIngredient => res.json(dbIngredient))
      .catch(err => res.status(422).json(err));
  }
};

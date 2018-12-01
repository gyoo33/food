import axios from "axios";

export default {
  // Gets books from the Google API
  getBooks: function(q) {
    return axios.get("/api/google", { params: { q: q } });
  },
  // Gets all saved recipe
  getSavedBooks: function() {
    return axios.get("/api/books");
  },
  // Deletes the saved recipe with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a recipe to the database
  saveBook: function(bookData) {
    console.log(bookData);
    return axios.post("/api/books", bookData);
  },
  // Gets all saved ingredients
  getSavedIngredients: function() {
    return axios.get("/api/ingredients");
  },
  // Deletes the saved ingredients with the given id
  deleteIngredient: function(id) {
    console.log(id);
    console.log("--------");
    return axios.delete("/api/ingredients/" + id);
  },
  // Saves an ingredient to the database
  saveIngredient: function(ingredientData) {
    console.log(ingredientData);
    console.log("--------------");
    return axios.post("/api/ingredients", ingredientData);
  }
};
 
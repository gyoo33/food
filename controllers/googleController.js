const axios = require("axios");
const db = require("../models");

// Defining methods for the googleController

// findAll searches the Google Books API and returns only the entries we haven't already saved

// It also makes sure that the books returned from the API all contain a title, author, link, description, and image
module.exports = {
  findAll: function(req, res) {
    const { query: params } = req;
    axios
      .get(
        "https://api.edamam.com/search?app_id=554e0660&app_key=ac065d3761872af25f7f155885604a3c&from=0&to=10&",
        {
          params
        }
      )
      // .then(results =>
      //   results.data.items.filter(
      //     result =>
      //       result.volumeInfo.title &&
      //       result.volumeInfo.infoLink &&
      //       result.volumeInfo.authors &&
      //       result.volumeInfo.description &&
      //       result.volumeInfo.imageLinks &&
      //       result.volumeInfo.imageLinks.thumbnail
      //   )
      // )
      //       .then(results => {
      //   results.data.hits.filter(
      //     result => {
      //       console.log("---------------------------------");
      //       console.log(result);
      //       console.log("---------------------------------");
      //       console.log(result.recipe.label);
      //       result.recipe.label &&
      //       result.recipe.url &&
      //       result.recipe.source &&
      //       result.recipe.calories &&
      //       result.volumeInfo.imageLinks &&
      //       result.volumeInfo.imageLinks.thumbnail
      //     }
      //   )}
      // )
      // .then(apiBooks =>
      //   db.Book.find().then(dbBooks =>
      //     apiBooks.filter(apiBook =>
      //       dbBooks.every(dbBook => dbBook.googleId.toString() !== apiBook.id)
      //     )
      //   )
      // )
      .then(books => {
        console.log(books.data.hits);
        // console.log(books.data.hits[0].recipe.label);
        res.json(books.data.hits);
      })
      .catch(err => res.status(422).json(err));
  }
};

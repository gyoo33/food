import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import Card from "../../components/Card";
import Form from "../../components/Form";
import Book from "../../components/Book";
import Footer from "../../components/Footer";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List } from "../../components/List";
import "./Home.css";

class Home extends Component {
  state = {
    books: [],
    q: "",
    message: "Search Your Ingredients To Begin!"
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  getBooks = () => {
    API.getBooks(this.state.q)
      .then(res => {
        this.setState({books: res.data});
        console.log(this.state.books);
      }

      )
      .catch(() =>
        this.setState({
          books: [],
          message: "No Recipes Were Found, Try different Ingredient Combination"
        })
      );
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.getBooks();
  };

  handleBookSave = id => {
    const book = this.state.books.find(book => book.recipe.uri === id);

    API.saveBook({
      googleId: book.recipe.uri,
      title: book.recipe.label,
      subtitle: book.recipe.calories,
      link: book.recipe.url,
      authors: book.recipe.source,
      description: book.recipe.ingredientLines.join(", "),
      image: book.recipe.image

    }).then(() => this.getBooks());
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="lg-12">
            <Jumbotron>
              <h1 className="text-center">
                <strong>Recipe Ingredient Search</strong>
              </h1>
              <h2 className="text-center">Search over one million recipes for your right meal!</h2>
              {/* <Card title="Ingredient Search" icon="far fa-lemon"> */}
              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}
              />
            {/* </Card> */}
            </Jumbotron>
          </Col>
          {/* <Col size="md-12">
            <Card title="Ingredient Search" icon="far fa-lemon">
              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}
              />
            </Card>
          </Col> */}
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Results" style="width:1000px">
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <Book
                      key={book.recipe.uri}
                      title={book.recipe.label}
                      subtitle={book.recipe.calories}
                      link={book.recipe.url}
                      authors={book.recipe.source}
                      description={book.recipe.ingredientLines.join(", ")}
                      image={book.recipe.image}
                      Button={() => (
                        <button
                          onClick={() => this.handleBookSave(book.recipe.uri)}
                          className="btn btn-primary ml-2"
                        >
                          Save
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">{this.state.message}</h2>
              )}
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Home;

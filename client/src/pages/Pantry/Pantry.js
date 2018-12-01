import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import Card from "../../components/Card";
import Form1 from "../../components/Form.1";
import Ingredient from "../../components/Ingredient";
import Footer from "../../components/Footer";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List } from "../../components/List";

class Home extends Component {
  state = {
    ingredients: [],
    q: "",
    message: "Type your Ingredients In!"
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    this.getSavedIngredients();
  }

  getSavedIngredients = () => {
    API.getSavedIngredients()
      .then(res => {
        this.setState({
          ingredients: res.data
        });
        console.log(this.state.ingredients);
      })
      .catch(err => console.log(err));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    // this.getIngredients();
    // console.log(this.state.q);
    // this.setState({ingredients:this.state.q});
    // console.log(this.state.ingredients);
    this.handleIngredientSave();
    this.getSavedIngredients();
  };

  handleIngredientSave = () => {
    // const book = this.state.ingredients.find(book => book.recipe.uri === id);
    // const ingredient = this.state.ingredients.find(ingredient => this.state.q === id);
    const ingredient = this.state.q;
    // console.log("-------------------" + ingredient);
    // console.log(this.state.q);
    API.saveIngredient({
      name: ingredient,
      Id: ingredient
    }).then(() => console.log("processed"));
    // .then(() => this.getIngredients());
  };

  handleIngredientDelete = id => {
    API.deleteIngredient(id).then(res => this.getSavedIngredients());
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="lg-12">
            <Jumbotron>
              <h1 className="text-center">
                <strong>Pantry</strong>
              </h1>
              <h2 className="text-center">Add Ingredient to Your Pantry!</h2>
              {/* <Card title="Ingredient Search" icon="far fa-lemon"> */}
              <Form1
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                // handleIngredientSave={this.handleIngredientSave}
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
            <Card title="Your Pantry">
              {this.state.ingredients.length ? (
                <List>
                  {this.state.ingredients.map(ingredient => (
                    <Ingredient
                      key={ingredient.Id}
                      title={ingredient.name}
                      Button={() => (
                        <button
                          onClick={() =>
                            this.handleIngredientDelete(ingredient.Id)
                          }
                          className="btn btn-danger ml-2"
                        >
                          X
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">Your panty is currently empty!</h2>
              )}
            </Card>
          </Col>
        </Row>
        {/* <Row>
          <Col size="md-12">
            <Card title="Results" style="width:1000px">
              {this.state.ingredients.length ? (
                <List>
                  {this.state.ingredients.map(book => (
                    <Book
                      key={book.recipe.uri}
                      title={book.recipe.label}
                    //   subtitle={book.recipe.calories}
                    //   link={book.recipe.url}
                    //   authors={book.recipe.source}
                    //   description={book.recipe.ingredientLines.join(", ")}
                    //   image={book.recipe.image}
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
        </Row> */}
        <Footer />
      </Container>
    );
  }
}

export default Home;

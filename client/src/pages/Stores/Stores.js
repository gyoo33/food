import React, { Component } from "react";
// import Jumbotron from "../../components/Jumbotron";
import Card from "../../components/Card";
// import Book from "../../components/Book";
import GoogleSearch from "../../components/GoogleSearch";
import Footer from "../../components/Footer";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import MapContainer from "../../components/Maps";
// import { List } from "../../components/List";

class Saved extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.getSavedBooks();
  }

  getSavedBooks = () => {
    API.getSavedBooks()
      .then(res =>
        this.setState({
          books: res.data
        })
      )
      .catch(err => console.log(err));
  };

  handleBookDelete = id => {
    API.deleteBook(id).then(res => this.getSavedBooks());
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Card title="Grocery Store Search" icon="far fa-maps">
              <GoogleSearch
                handleInputChange={this.handleInputChange}
                // handleFormSubmit={this.handleFormSubmit}
                // q={this.state.q}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Grocery Store Maps" icon="download">
              <MapContainer />
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Saved;

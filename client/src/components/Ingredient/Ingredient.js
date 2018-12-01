import React from "react";
import { ListItem } from "../List";
import { Row, Col } from "../Grid";
import "./Ingredient.css";

const Book = ({ title, Button }) => (
  <ListItem>
    <Row className="flex-wrap-reverse">
      <Col size="md-12">
        <h3 className="font-italic text-center ingredients">{title}</h3>
      </Col>
      <Col size="md-12">
      <div className="text-right">
      <Button />
      </div>

      </Col>
    </Row>
  </ListItem>
);

export default Book;

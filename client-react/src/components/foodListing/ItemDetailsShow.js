import React from "react";
import { useState } from "react";
import {
  Form,
  FormControl,
  Button,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Moment from "react-moment";
// import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./style.css";

const ItemDetailsShow = ({ foodData }) => {
  //   const handleCreateUser = (event) => {
  //     event.preventDefault();
  //     axios.post("/users", formData).then((response) => {
  //       console.log("response", response);
  //       setCreated(true);
  //     });
  //   };

  return (
    <Container>
      <Row>
        <Col>Title:{foodData.title}</Col>
      </Row>

      <Row>
        <Col>Quantity:{foodData.quantity}</Col>
      </Row>

      <Row>
        <Col>Category:{foodData.category}</Col>
      </Row>

      <Row>
        <Col>Is this Halal?:{foodData.isHalal}</Col>
      </Row>

      <Row>
        <Col>Is this vegetarian?:{foodData.isVegetarian}</Col>
      </Row>

      <Row>
        <Col>Description:{foodData.description}</Col>
      </Row>

      <Row>
        <Col>
          Best Before Date:
          <Moment format="DD/MM/YYYY">{foodData.bestBefore}</Moment>
        </Col>
      </Row>

      <Row>
        <Col>Collection Address:{foodData.collectionAddress}</Col>
      </Row>

      <Row>
        <Col>Contact Person:{foodData.contactPerson}</Col>
      </Row>

      <Row>
        <Col>Contact Number:{foodData.contactNum}</Col>
      </Row>

      {/* <Row>
            <Col>
              <Button type="submit" style={{ margin: "10px 0" }}>
                Create Account
              </Button>
            </Col>
          </Row> */}
    </Container>
  );
};

export default ItemDetailsShow;
